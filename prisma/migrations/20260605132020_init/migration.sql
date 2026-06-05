-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('announced', 'created', 'planned', 'appeared', 'active', 'no_show', 'replaced', 'sick', 'vacation', 'inactive');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('not_started', 'announced', 'document_received', 'card_assigned', 'customer_system_created', 'foreman_informed', 'first_workday_planned', 'first_pick_confirmed', 'active', 'no_show', 'replacement_requested');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('planned', 'confirmed', 'appeared', 'missed', 'replaced', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "TimeEntryStatus" AS ENUM ('imported', 'unreviewed', 'suspicious', 'under_review', 'corrected', 'final', 'billable', 'excluded');

-- CreateEnum
CREATE TYPE "TimeIssueStatus" AS ENUM ('open', 'assigned_to_foreman', 'sent_to_customer', 'corrected', 'rejected', 'resolved');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('open', 'in_progress', 'waiting_for_partner', 'waiting_for_customer', 'waiting_for_management', 'resolved', 'cancelled');

-- CreateEnum
CREATE TYPE "CasePriority" AS ENUM ('low', 'normal', 'high', 'critical');

-- CreateEnum
CREATE TYPE "CaseType" AS ENUM ('no_show', 'time_error', 'worker_complaint', 'missing_document', 'customer_document_request', 'fuel_receipt', 'reimbursement', 'fine', 'partner_claim', 'vehicle_problem', 'customer_problem', 'other');

-- CreateTable
CREATE TABLE "AppUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "displayName" TEXT,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'announced',
    "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'not_started',
    "externalCardNumber" TEXT,
    "externalSystemId" TEXT,
    "phone" TEXT,
    "language" TEXT,
    "firstWorkday" TIMESTAMP(3),
    "notes" TEXT,
    "partnerCompanyId" TEXT,
    "coordinatorId" TEXT,
    "currentCustomerId" TEXT,
    "currentSiteId" TEXT,
    "currentShiftId" TEXT,
    "currentPositionId" TEXT,
    "accommodationId" TEXT,
    "vehicleGroupId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "role" TEXT,
    "notes" TEXT,
    "partnerCompanyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startsAt" TEXT,
    "endsAt" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "customerId" TEXT,
    "siteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "customerId" TEXT,
    "siteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'planned',
    "notes" TEXT,
    "employeeId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "siteId" TEXT,
    "shiftId" TEXT,
    "positionId" TEXT,
    "plannedById" TEXT,
    "confirmedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restriction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'normal',
    "reason" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restriction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "capacity" INTEGER,
    "notes" TEXT,
    "driverEmployeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "capacity" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeEntry" (
    "id" TEXT NOT NULL,
    "workDate" TIMESTAMP(3) NOT NULL,
    "source" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "breakMinutes" INTEGER,
    "rawHours" DOUBLE PRECISION,
    "validatedHours" DOUBLE PRECISION,
    "status" "TimeEntryStatus" NOT NULL DEFAULT 'unreviewed',
    "notes" TEXT,
    "employeeId" TEXT NOT NULL,
    "customerId" TEXT,
    "siteId" TEXT,
    "assignmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeIssue" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "TimeIssueStatus" NOT NULL DEFAULT 'open',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedTo" TEXT,
    "resolution" TEXT,
    "notes" TEXT,
    "timeEntryId" TEXT,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerRule" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "configJson" JSONB,
    "customerId" TEXT NOT NULL,
    "siteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceMetric" (
    "id" TEXT NOT NULL,
    "metricDate" TIMESTAMP(3) NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "source" TEXT,
    "notes" TEXT,
    "employeeId" TEXT,
    "customerId" TEXT,
    "siteId" TEXT,
    "shiftId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerformanceMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalCase" (
    "id" TEXT NOT NULL,
    "type" "CaseType" NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'open',
    "priority" "CasePriority" NOT NULL DEFAULT 'normal',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "amount" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "nextStep" TEXT,
    "outcome" TEXT,
    "ownerId" TEXT,
    "employeeId" TEXT,
    "customerId" TEXT,
    "siteId" TEXT,
    "partnerCompanyId" TEXT,
    "vehicleGroupId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentStatus" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "source" TEXT,
    "externalLocation" TEXT,
    "notes" TEXT,
    "employeeId" TEXT,
    "partnerCompanyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFinancialSnapshot" (
    "id" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "expectedRevenue" DOUBLE PRECISION,
    "directLaborCost" DOUBLE PRECISION,
    "transportCost" DOUBLE PRECISION,
    "accommodationCost" DOUBLE PRECISION,
    "overheadCost" DOUBLE PRECISION,
    "otherCost" DOUBLE PRECISION,
    "grossMargin" DOUBLE PRECISION,
    "status" TEXT,
    "notes" TEXT,
    "customerId" TEXT NOT NULL,
    "siteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectFinancialSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- CreateIndex
CREATE INDEX "AppUser_role_idx" ON "AppUser"("role");

-- CreateIndex
CREATE INDEX "Employee_status_idx" ON "Employee"("status");

-- CreateIndex
CREATE INDEX "Employee_onboardingStatus_idx" ON "Employee"("onboardingStatus");

-- CreateIndex
CREATE INDEX "Employee_partnerCompanyId_idx" ON "Employee"("partnerCompanyId");

-- CreateIndex
CREATE INDEX "Employee_coordinatorId_idx" ON "Employee"("coordinatorId");

-- CreateIndex
CREATE INDEX "Employee_currentCustomerId_idx" ON "Employee"("currentCustomerId");

-- CreateIndex
CREATE INDEX "Employee_currentSiteId_idx" ON "Employee"("currentSiteId");

-- CreateIndex
CREATE INDEX "PartnerCompany_status_idx" ON "PartnerCompany"("status");

-- CreateIndex
CREATE INDEX "Coordinator_partnerCompanyId_idx" ON "Coordinator"("partnerCompanyId");

-- CreateIndex
CREATE INDEX "Customer_status_idx" ON "Customer"("status");

-- CreateIndex
CREATE INDEX "Site_customerId_idx" ON "Site"("customerId");

-- CreateIndex
CREATE INDEX "Site_status_idx" ON "Site"("status");

-- CreateIndex
CREATE INDEX "Shift_customerId_idx" ON "Shift"("customerId");

-- CreateIndex
CREATE INDEX "Shift_siteId_idx" ON "Shift"("siteId");

-- CreateIndex
CREATE INDEX "Position_customerId_idx" ON "Position"("customerId");

-- CreateIndex
CREATE INDEX "Position_siteId_idx" ON "Position"("siteId");

-- CreateIndex
CREATE INDEX "Assignment_date_idx" ON "Assignment"("date");

-- CreateIndex
CREATE INDEX "Assignment_status_idx" ON "Assignment"("status");

-- CreateIndex
CREATE INDEX "Assignment_date_status_idx" ON "Assignment"("date", "status");

-- CreateIndex
CREATE INDEX "Assignment_employeeId_idx" ON "Assignment"("employeeId");

-- CreateIndex
CREATE INDEX "Assignment_customerId_idx" ON "Assignment"("customerId");

-- CreateIndex
CREATE INDEX "Assignment_siteId_idx" ON "Assignment"("siteId");

-- CreateIndex
CREATE INDEX "Assignment_plannedById_idx" ON "Assignment"("plannedById");

-- CreateIndex
CREATE INDEX "Assignment_confirmedById_idx" ON "Assignment"("confirmedById");

-- CreateIndex
CREATE INDEX "Restriction_employeeId_idx" ON "Restriction"("employeeId");

-- CreateIndex
CREATE INDEX "Restriction_active_idx" ON "Restriction"("active");

-- CreateIndex
CREATE INDEX "VehicleGroup_driverEmployeeId_idx" ON "VehicleGroup"("driverEmployeeId");

-- CreateIndex
CREATE INDEX "Accommodation_status_idx" ON "Accommodation"("status");

-- CreateIndex
CREATE INDEX "TimeEntry_workDate_idx" ON "TimeEntry"("workDate");

-- CreateIndex
CREATE INDEX "TimeEntry_status_idx" ON "TimeEntry"("status");

-- CreateIndex
CREATE INDEX "TimeEntry_employeeId_idx" ON "TimeEntry"("employeeId");

-- CreateIndex
CREATE INDEX "TimeEntry_customerId_idx" ON "TimeEntry"("customerId");

-- CreateIndex
CREATE INDEX "TimeEntry_siteId_idx" ON "TimeEntry"("siteId");

-- CreateIndex
CREATE INDEX "TimeEntry_assignmentId_idx" ON "TimeEntry"("assignmentId");

-- CreateIndex
CREATE INDEX "TimeIssue_status_idx" ON "TimeIssue"("status");

-- CreateIndex
CREATE INDEX "TimeIssue_employeeId_idx" ON "TimeIssue"("employeeId");

-- CreateIndex
CREATE INDEX "TimeIssue_timeEntryId_idx" ON "TimeIssue"("timeEntryId");

-- CreateIndex
CREATE INDEX "CustomerRule_customerId_idx" ON "CustomerRule"("customerId");

-- CreateIndex
CREATE INDEX "CustomerRule_siteId_idx" ON "CustomerRule"("siteId");

-- CreateIndex
CREATE INDEX "CustomerRule_type_idx" ON "CustomerRule"("type");

-- CreateIndex
CREATE INDEX "CustomerRule_active_idx" ON "CustomerRule"("active");

-- CreateIndex
CREATE INDEX "PerformanceMetric_metricDate_idx" ON "PerformanceMetric"("metricDate");

-- CreateIndex
CREATE INDEX "PerformanceMetric_metricType_idx" ON "PerformanceMetric"("metricType");

-- CreateIndex
CREATE INDEX "PerformanceMetric_employeeId_idx" ON "PerformanceMetric"("employeeId");

-- CreateIndex
CREATE INDEX "PerformanceMetric_customerId_idx" ON "PerformanceMetric"("customerId");

-- CreateIndex
CREATE INDEX "PerformanceMetric_siteId_idx" ON "PerformanceMetric"("siteId");

-- CreateIndex
CREATE INDEX "PerformanceMetric_shiftId_idx" ON "PerformanceMetric"("shiftId");

-- CreateIndex
CREATE INDEX "OperationalCase_status_idx" ON "OperationalCase"("status");

-- CreateIndex
CREATE INDEX "OperationalCase_priority_idx" ON "OperationalCase"("priority");

-- CreateIndex
CREATE INDEX "OperationalCase_dueDate_idx" ON "OperationalCase"("dueDate");

-- CreateIndex
CREATE INDEX "OperationalCase_type_idx" ON "OperationalCase"("type");

-- CreateIndex
CREATE INDEX "OperationalCase_status_priority_idx" ON "OperationalCase"("status", "priority");

-- CreateIndex
CREATE INDEX "OperationalCase_ownerId_idx" ON "OperationalCase"("ownerId");

-- CreateIndex
CREATE INDEX "OperationalCase_employeeId_idx" ON "OperationalCase"("employeeId");

-- CreateIndex
CREATE INDEX "OperationalCase_customerId_idx" ON "OperationalCase"("customerId");

-- CreateIndex
CREATE INDEX "OperationalCase_siteId_idx" ON "OperationalCase"("siteId");

-- CreateIndex
CREATE INDEX "OperationalCase_partnerCompanyId_idx" ON "OperationalCase"("partnerCompanyId");

-- CreateIndex
CREATE INDEX "OperationalCase_vehicleGroupId_idx" ON "OperationalCase"("vehicleGroupId");

-- CreateIndex
CREATE INDEX "DocumentStatus_employeeId_idx" ON "DocumentStatus"("employeeId");

-- CreateIndex
CREATE INDEX "DocumentStatus_partnerCompanyId_idx" ON "DocumentStatus"("partnerCompanyId");

-- CreateIndex
CREATE INDEX "DocumentStatus_status_idx" ON "DocumentStatus"("status");

-- CreateIndex
CREATE INDEX "ProjectFinancialSnapshot_customerId_idx" ON "ProjectFinancialSnapshot"("customerId");

-- CreateIndex
CREATE INDEX "ProjectFinancialSnapshot_siteId_idx" ON "ProjectFinancialSnapshot"("siteId");

-- CreateIndex
CREATE INDEX "ProjectFinancialSnapshot_periodStart_periodEnd_idx" ON "ProjectFinancialSnapshot"("periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "ProjectFinancialSnapshot_status_idx" ON "ProjectFinancialSnapshot"("status");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "PartnerCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentCustomerId_fkey" FOREIGN KEY ("currentCustomerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentSiteId_fkey" FOREIGN KEY ("currentSiteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentShiftId_fkey" FOREIGN KEY ("currentShiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentPositionId_fkey" FOREIGN KEY ("currentPositionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_vehicleGroupId_fkey" FOREIGN KEY ("vehicleGroupId") REFERENCES "VehicleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "PartnerCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_plannedById_fkey" FOREIGN KEY ("plannedById") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restriction" ADD CONSTRAINT "Restriction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleGroup" ADD CONSTRAINT "VehicleGroup_driverEmployeeId_fkey" FOREIGN KEY ("driverEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeIssue" ADD CONSTRAINT "TimeIssue_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeIssue" ADD CONSTRAINT "TimeIssue_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerRule" ADD CONSTRAINT "CustomerRule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerRule" ADD CONSTRAINT "CustomerRule_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "PartnerCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalCase" ADD CONSTRAINT "OperationalCase_vehicleGroupId_fkey" FOREIGN KEY ("vehicleGroupId") REFERENCES "VehicleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStatus" ADD CONSTRAINT "DocumentStatus_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStatus" ADD CONSTRAINT "DocumentStatus_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "PartnerCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFinancialSnapshot" ADD CONSTRAINT "ProjectFinancialSnapshot_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFinancialSnapshot" ADD CONSTRAINT "ProjectFinancialSnapshot_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
