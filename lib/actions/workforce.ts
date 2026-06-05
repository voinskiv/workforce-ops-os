"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { hasDatabaseUrl, prisma } from "@/lib/db/prisma";

function value(formData: FormData, key: string) {
  const raw = formData.get(key);
  if (typeof raw !== "string" || raw.trim() === "") return undefined;
  return raw.trim();
}

function redirectWithDemoNotice(path: string): never {
  redirect(`${path}?demo=readonly`);
}

export async function advanceOnboardingAction(formData: FormData) {
  const employeeId = value(formData, "employeeId");
  const nextStatus = value(formData, "nextStatus");

  if (!employeeId || !nextStatus) redirect("/onboarding");
  if (!hasDatabaseUrl()) redirectWithDemoNotice("/onboarding");

  try {
    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        onboardingStatus: nextStatus as never,
        status: nextStatus === "active" ? "active" : undefined,
      },
    });
  } catch {
    redirectWithDemoNotice("/onboarding");
  }

  revalidatePath("/onboarding");
  revalidatePath("/employees");
  revalidatePath(`/employees/${employeeId}`);
  redirect("/onboarding");
}

export async function markNoShowAction(formData: FormData) {
  const employeeId = value(formData, "employeeId");
  const employeeName = value(formData, "employeeName") ?? "Mitarbeiter";
  if (!employeeId) redirect("/onboarding");
  if (!hasDatabaseUrl()) redirectWithDemoNotice("/onboarding");

  try {
    const [owner, employee] = await Promise.all([
      prisma.appUser.findFirst({
        where: { role: "backoffice" },
        select: { id: true },
      }),
      prisma.employee.findUnique({
        where: { id: employeeId },
        select: {
          partnerCompanyId: true,
          currentCustomerId: true,
          currentSiteId: true,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.employee.update({
        where: { id: employeeId },
        data: {
          status: "no_show",
          onboardingStatus: "no_show",
        },
      }),
      prisma.operationalCase.create({
        data: {
          type: "no_show",
          status: "open",
          priority: "high",
          title: `No-Show: ${employeeName}`,
          description: "Created from onboarding no-show action.",
          ownerId: owner?.id,
          employeeId,
          partnerCompanyId: employee?.partnerCompanyId,
          customerId: employee?.currentCustomerId,
          siteId: employee?.currentSiteId,
          nextStep: "Partner muss Ersatz liefern und die Ersatzperson bestaetigen.",
        },
      }),
    ]);
  } catch {
    redirectWithDemoNotice("/onboarding");
  }

  revalidatePath("/onboarding");
  revalidatePath("/dashboard");
  revalidatePath("/cases");
  revalidatePath("/employees");
  revalidatePath(`/employees/${employeeId}`);
  redirect("/onboarding");
}

export async function updateCaseStatusAction(formData: FormData) {
  const caseId = value(formData, "caseId");
  const status = value(formData, "status");

  if (!caseId || !status) redirect("/cases");
  if (!hasDatabaseUrl()) redirectWithDemoNotice("/cases");

  try {
    await prisma.operationalCase.update({
      where: { id: caseId },
      data: { status: status as never },
    });
  } catch {
    redirectWithDemoNotice("/cases");
  }

  revalidatePath("/cases");
  revalidatePath("/dashboard");
  redirect("/cases");
}

export async function createCaseAction(formData: FormData) {
  const title = value(formData, "title");
  const type = value(formData, "type") ?? "other";
  const priority = value(formData, "priority") ?? "normal";
  const ownerId = value(formData, "ownerId");
  const employeeId = value(formData, "employeeId");
  const customerId = value(formData, "customerId");
  const partnerCompanyId = value(formData, "partnerCompanyId");
  const dueDate = value(formData, "dueDate");
  const amount = value(formData, "amount");
  const nextStep = value(formData, "nextStep");

  if (!title) redirect("/cases");
  if (!hasDatabaseUrl()) redirectWithDemoNotice("/cases");

  try {
    await prisma.operationalCase.create({
      data: {
        title,
        type: type as never,
        priority: priority as never,
        status: "open",
        ownerId,
        employeeId,
        customerId,
        partnerCompanyId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        amount: amount ? Number(amount) : undefined,
        currency: "EUR",
        nextStep,
      },
    });
  } catch {
    redirectWithDemoNotice("/cases");
  }

  revalidatePath("/cases");
  revalidatePath("/dashboard");
  redirect("/cases");
}

export async function updateTimeIssueStatusAction(formData: FormData) {
  const issueId = value(formData, "issueId");
  const status = value(formData, "status");

  if (!issueId || !status) redirect("/time-validation");
  if (!hasDatabaseUrl()) redirectWithDemoNotice("/time-validation");

  try {
    await prisma.timeIssue.update({
      where: { id: issueId },
      data: { status: status as never },
    });
  } catch {
    redirectWithDemoNotice("/time-validation");
  }

  revalidatePath("/time-validation");
  revalidatePath("/dashboard");
  revalidatePath("/employees");
  redirect("/time-validation");
}
