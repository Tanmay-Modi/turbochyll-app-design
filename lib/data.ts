// Mock data derived from the TurboChyll ERP screenshots

export type Sar = {
  id: string
  date: string
  job: string
  submittedBy: string
  hoursST: number
  hoursOT: number
  assocAsr?: string
  quoteTm?: string
  invoice?: string
  state: "office" | "processing" | "billed" | "completed" | "fileroom" | "refrigerant"
  urgent?: boolean
  contact?: string
  address?: string
  city?: string
  phone?: string
}

export const SARS: Sar[] = [
  { id: "43662", date: "07/01/2026", job: "New York Academy Of Medicine-1216 5th Ave.", submittedBy: "Diraniel Ramirez", hoursST: 0, hoursOT: 3, quoteTm: "T&M#6256", state: "office" },
  { id: "43673", date: "07/01/2026", job: "RAMP - 28-40 West 23rd Street", submittedBy: "Loyd Lall", hoursST: 0, hoursOT: 0, quoteTm: "T&M#6241", state: "office" },
  { id: "43665", date: "07/01/2026", job: "Colliers International - 28-40 West 23rd St", submittedBy: "Loyd Lall", hoursST: 4, hoursOT: 0, assocAsr: "43665", quoteTm: "T&M#6250", state: "office", urgent: true },
  { id: "43664", date: "07/01/2026", job: "New York Academy Of Medicine-1216 5th Ave.", submittedBy: "Lucas Stauffiger", hoursST: 0, hoursOT: 3, quoteTm: "T&M#6256", state: "processing" },
  { id: "43656", date: "07/01/2026", job: "Montefiore Hospital- Westchester Square", submittedBy: "Lucas Stauffiger", hoursST: 3, hoursOT: 0, quoteTm: "T&M#6235", state: "processing" },
  { id: "43657", date: "07/01/2026", job: "NHS US, LLC - 10 Vitamin Dr", submittedBy: "Rony Cali", hoursST: 3, hoursOT: 0, quoteTm: "T&M#6259", state: "billed" },
  { id: "43654", date: "07/01/2026", job: "NHS US, LLC - 90 Orville Dr", submittedBy: "Rony Cali", hoursST: 3, hoursOT: 0, quoteTm: "T&M#6232", state: "billed" },
  { id: "43644", date: "07/01/2026", job: "NHS US, LLC - 105 Orville Dr", submittedBy: "Rony Cali", hoursST: 2, hoursOT: 0, quoteTm: "T&M#6251", state: "completed" },
  { id: "43661", date: "07/01/2026", job: "NHS US, LLC - 10 Vitamin Dr", submittedBy: "Steven Quiroz", hoursST: 0, hoursOT: 0, quoteTm: "T&M#6259", state: "completed" },
  { id: "43653", date: "07/01/2026", job: "NHS US, LLC - 90 Orville Dr", submittedBy: "Steven Quiroz", hoursST: 0, hoursOT: 0, quoteTm: "T&M#6232", state: "fileroom" },
  { id: "43643", date: "07/01/2026", job: "NHS US, LLC - 105 Orville Dr", submittedBy: "Steven Quiroz", hoursST: 0, hoursOT: 0, quoteTm: "T&M#6251", state: "refrigerant" },
]

export type Opportunity = {
  id: string
  name: string
  asr?: string
  title: string
  contents: string[]
  date: string
  owner: string
  archived?: boolean
}

export const OPPORTUNITIES: Opportunity[] = [
  { id: "o1", name: "ESA Property Management - 30 E 60th Street", title: "New Tenant Tie-In", contents: ["6/26 - AL and Ricky are going to look at this on Tuesday 6/30.", "7/1 - AL was onsite yesterday; work is being completed by another contractor, nothing more needed from us."], date: "06/26/2026", owner: "ricky / AL" },
  { id: "o2", name: "SL Green - 919 3rd Ave", title: "Coil Replacement", contents: ["6/26 - Ricky set up site visit for Tuesday 6/30 for Ricky / AL / Taylor to measure coil out."], date: "06/26/2026", owner: "ricky / AL" },
  { id: "o3", name: "Brian Kenny", title: "LIFON - Catholic Health & other Opps", contents: ["6/26 - Sean told Ricky to remind him to follow up with Brian Kenny on July 15."], date: "06/26/2026", owner: "ricky / AL" },
  { id: "o4", name: "Silverstein Properties - 3 World Trade Center", title: "Update on Repairs / Replacement Unit - AC-13-1", contents: ["6/25 - Ricky is working on Revised Quote #13055 for Repairs and updated quote for replacement option."], date: "06/25/2026", owner: "ricky / AL" },
  { id: "o5", name: "Pretect - 51 Madison", title: "(3) Radiators Fans", contents: ["6/16 - Sean meet with Tom, need to look at some fans for 51 Madison.", "6/23 - Ricky & AL looked at (3) Radiant Fans to replace.", "6/26 - Ricky sent email to (2) Radiator companies as the main manufacturer is out of business."], date: "06/25/2026", owner: "ricky / AL" },
  { id: "o6", name: "DVM Industries - Metropolitan Hospital - 1901 1st", asr: "ASR-43411", title: "Various CT Repairs", contents: ["6/18 - Ricky sent to Landover for pricing."], date: "06/18/2026", owner: "ricky / AL" },
  { id: "o7", name: "Pretect - 200 Park Avenue", title: "(4) Arctic Chiller Replacements", contents: ["6/18 - Ricky sent to Trane & SRS for Replacement Options."], date: "06/18/2026", owner: "ricky / AL" },
  { id: "o8", name: "DVM - Jersey City", title: "Chiller Replacement with Charles", contents: ["5/14 - Sean to follow up on this one."], date: "05/14/2026", owner: "Ricky /AL / Sean", archived: true },
]

export type Po = {
  id: string
  vendor: string
  job: string
  date: string
  total: number
  netTax: number
  quote?: string
  tm?: string
  invoice?: number
  inQb: boolean
  state: "payables" | "wip" | "waiting" | "notqb" | "paid" | "completed" | "voided"
  prevailingWage?: boolean
  creditCard?: boolean
}

export const POS: Po[] = [
  { id: "12096", vendor: "Beardslee Transmission Equipment", job: "DVM Industries - Dykman Clinic", date: "06/26/2026", total: 0, netTax: 0, quote: "13388", inQb: false, state: "payables" },
  { id: "12094", vendor: "Credit Card Purchase", job: "Montefiore Hospital-1825 Eastchester- Mitsubishi", date: "06/25/2026", total: 108.04, netTax: 8.81, tm: "T&M#6219", inQb: false, state: "payables", prevailingWage: true, creditCard: true },
  { id: "12106", vendor: "Ferguson Enterprises, Inc.", job: "NHS US, LLC - 105 Orville Dr", date: "06/29/2026", total: 57.09, netTax: 4.59, tm: "T&M#6192", inQb: false, state: "wip" },
  { id: "12103", vendor: "Ferguson Enterprises, Inc.", job: "NHS US, LLC - 105 Orville Dr", date: "06/29/2026", total: 605.98, netTax: 48.76, tm: "T&M#6192", inQb: false, state: "wip" },
  { id: "11849", vendor: "H&L Heating Supply Inc.", job: "Caccamo", date: "05/07/2026", total: 2187.61, netTax: 178.32, invoice: 2187.61, tm: "T&M#", inQb: false, state: "waiting" },
  { id: "12117", vendor: "Johnstone Supply BF", job: "NHS US, LLC - 90 Orville Dr", date: "06/30/2026", total: 401.5, netTax: 32.3, tm: "T&M#6232", inQb: false, state: "notqb" },
  { id: "12111", vendor: "Johnstone Supply BF", job: "Montefiore Hospital-1250 Waters Place", date: "06/29/2026", total: 6262.71, netTax: 510.51, tm: "T&M#6234", inQb: true, state: "paid" },
  { id: "12112", vendor: "Johnstone Supply BF", job: "NY Methodist", date: "06/29/2026", total: 5683.06, netTax: 463.26, tm: "T&M#6237", inQb: true, state: "completed" },
]

export type WorkOnHand = {
  id: string
  category: string
  tmQuote: string
  customer: string
  description: string
  asr?: string
  dateApproved: string
  dateScheduled?: string
  techs: { date: string; name: string }[]
  invoice?: string
  estST: number
  estOT: number
  remST: number
  remOT: number
  poList?: string
  isTruck?: boolean
  status: "active" | "completed"
}

export const WORK_ON_HAND: WorkOnHand[] = [
  { id: "6265", category: "T&M", tmQuote: "T&M#6265", customer: "Montefiore Medical Park - 1625 Poplar Ave", description: "On-Call", dateApproved: "07/01/2026", techs: [{ date: "07/02/2026", name: "Lucas Stauffiger" }, { date: "07/02/2026", name: "Diraniel Ramirez" }], estST: 0, estOT: 0, remST: 0, remOT: 0, status: "active" },
  { id: "6264", category: "T&M", tmQuote: "T&M#6264", customer: "Wyckoff Hospital-374 Stockholm St.", description: "On-Call. Req by Eddie", dateApproved: "07/01/2026", techs: [{ date: "07/02/2026", name: "Collin O'Donnell" }, { date: "07/02/2026", name: "Christopher Bryan" }], estST: 0, estOT: 0, remST: 0, remOT: 0, status: "active" },
  { id: "6263", category: "T&M", tmQuote: "T&M#6263", customer: "NY Methodist", description: "4th Floor Corridor", dateApproved: "07/01/2026", techs: [{ date: "07/01/2026", name: "Riccardo Scozzari" }, { date: "07/01/2026", name: "Juan Aucaquizhpi" }], estST: 0, estOT: 0, remST: 0, remOT: 0, status: "active" },
  { id: "6262", category: "T&M", tmQuote: "T&M#6262", customer: "NYU Dorms - Rubin Hall", description: "3 Chillers tripping - fan overload error. Req by Jake", dateApproved: "07/01/2026", techs: [], estST: 0, estOT: 0, remST: 0, remOT: 0, status: "active" },
  { id: "6259", category: "T&M", tmQuote: "T&M#6259", customer: "NHS US, LLC - 10 Vitamin Dr", description: "Chiller not running. Req by Arnoldo", dateApproved: "07/01/2026", techs: [{ date: "07/01/2026", name: "Steven Quiroz" }, { date: "07/01/2026", name: "Rony Cali" }], estST: 0, estOT: 0, remST: 0, remOT: 0, status: "active" },
  { id: "6257", category: "Truck", tmQuote: "T&M#6257", customer: "DVM Industries -- 34 Spring Street", description: "1st floor not cooling. Req by Armando", dateApproved: "07/01/2026", techs: [{ date: "07/02/2026", name: "Robert Pagan" }, { date: "07/02/2026", name: "Michael Lewis" }], estST: 0, estOT: 0, remST: 0, remOT: 0, poList: "12125", isTruck: true, status: "active" },
]

export type MarFolder = {
  id: string
  job: string
  serviceDate: string
  quote: string
  status: "P" | "A" | "R" | "F"
  lines: number
  completed: number
}

export const MAR_FOLDERS: MarFolder[] = [
  { id: "MAR-2041", job: "Montefiore Hospital-1250 Waters Place", serviceDate: "06/30/2026", quote: "11550", status: "A", lines: 12, completed: 5 },
  { id: "MAR-2038", job: "NY Methodist", serviceDate: "06/29/2026", quote: "6237", status: "A", lines: 8, completed: 8 },
  { id: "MAR-2035", job: "NHS US, LLC - 105 Orville Dr", serviceDate: "06/28/2026", quote: "6192", status: "R", lines: 6, completed: 6 },
  { id: "MAR-2030", job: "Wyckoff Hospital-374 Stockholm St.", serviceDate: "06/25/2026", quote: "6224", status: "P", lines: 4, completed: 0 },
  { id: "MAR-2021", job: "DVM Industries - Dykman Clinic", serviceDate: "06/20/2026", quote: "13388", status: "F", lines: 10, completed: 10 },
]

export type MarLine = {
  id: string
  tag: string
  condition: string
  building: string
  location: string
  type: string
  areaServed: string
  manufacturer: string
  serial: string
  model: string
  labor: number
  status: "New" | "Inprogress" | "Completed"
  tech: string
  isCoolingTower?: boolean
}

export const MAR_LINES: MarLine[] = [
  { id: "l1", tag: "AC-1", condition: "Fair", building: "B-1", location: "Roof", type: "RTU", areaServed: "1st Floor", manufacturer: "Trane", serial: "TR-88213", model: "YCD120", labor: 2, status: "Completed", tech: "Rony Cali" },
  { id: "l2", tag: "CT-1", condition: "Poor", building: "B-1", location: "Roof", type: "Cooling Tower", areaServed: "Chiller Plant", manufacturer: "BAC", serial: "BAC-5521", model: "PT2-0810", labor: 3, status: "Inprogress", tech: "Steven Quiroz", isCoolingTower: true },
  { id: "l3", tag: "PUMP-2", condition: "Good", building: "B-2", location: "Mech Room", type: "Pump", areaServed: "Loop A", manufacturer: "Bell & Gossett", serial: "BG-1190", model: "e-1510", labor: 1, status: "New", tech: "Loyd Lall" },
]

export type Ctic = {
  id: string
  job: string
  address: string
  towerLocation: string
  designation: string
  category: "HHC" | "Other"
  year: string
  status: "office" | "filed" | "completed"
  dateStarted?: string
  dateCompleted?: string
}

export const CTICS: Ctic[] = [
  { id: "CT-2601", job: "HHC - Elmhurst Hospital", address: "79-01 Broadway, Elmhurst NY", towerLocation: "Roof - North", designation: "CT-1", category: "HHC", year: "2026", status: "office", dateStarted: "06/28/2026" },
  { id: "CT-2602", job: "HHC - Lincoln Hospital", address: "234 E 149th St, Bronx NY", towerLocation: "Penthouse", designation: "CT-3", category: "HHC", year: "2026", status: "office", dateStarted: "06/29/2026" },
  { id: "CT-2555", job: "Montefiore Hospital-1250 Waters Place", address: "1250 Waters Pl, Bronx NY", towerLocation: "Roof", designation: "CT-2", category: "Other", year: "2026", status: "completed", dateStarted: "06/20/2026", dateCompleted: "06/22/2026" },
  { id: "CT-2401", job: "NYU - 44 W 4th Street", address: "44 W 4th St, NY", towerLocation: "Roof", designation: "CT-1", category: "Other", year: "2025", status: "filed", dateStarted: "08/10/2025", dateCompleted: "08/12/2025" },
]

export type Quote = {
  id: string
  publisher: string
  customer: string
  description: string
  dateSent: string
  amount: number
  materialAmount: number
  laborAmount: number
  profit: number
  followUp?: string
  approved?: boolean
  receipt?: boolean
}

export const QUOTES: Quote[] = [
  { id: "13388", publisher: "Ricky", customer: "DVM Industries - Dykman Clinic", description: "Compressor replacement", dateSent: "06/22/2026", amount: 18400, materialAmount: 9200, laborAmount: 5400, profit: 3800, followUp: "07/06/2026" },
  { id: "13055", publisher: "Ricky", customer: "Silverstein Properties - 3 WTC", description: "Repairs AC-13-1 / replacement option", dateSent: "06/25/2026", amount: 42600, materialAmount: 21000, laborAmount: 12000, profit: 9600, followUp: "07/09/2026", approved: true },
  { id: "13490", publisher: "AL", customer: "Pretect - 51 Madison", description: "(3) Radiant Fans replacement", dateSent: "06/25/2026", amount: 8750, materialAmount: 4900, laborAmount: 2200, profit: 1650, followUp: "07/02/2026" },
  { id: "13473", publisher: "Ricky", customer: "DVM Industries - Susan McKinney", description: "Fan Arrays AC#3 & AC#4", dateSent: "06/18/2026", amount: 26300, materialAmount: 14000, laborAmount: 7300, profit: 5000, receipt: true },
]

export type TmProfit = {
  id: string
  job: string
  invoice?: string
  dateCompleted: string
  materialCost: number
  materialPrice: number
  laborCost: number
  totalLabor: number
  totalInvoiced: number
}

export const TM_NOW: TmProfit[] = [
  { id: "T&M#6232", job: "NHS US, LLC - 90 Orville Dr", invoice: "INV-9021", dateCompleted: "06/28/2026", materialCost: 640, materialPrice: 980, laborCost: 720, totalLabor: 1200, totalInvoiced: 2600 },
  { id: "T&M#6251", job: "NHS US, LLC - 105 Orville Dr", invoice: "INV-9018", dateCompleted: "06/27/2026", materialCost: 310, materialPrice: 480, laborCost: 480, totalLabor: 820, totalInvoiced: 1500 },
  { id: "T&M#6235", job: "Montefiore Hospital- Westchester Sq", invoice: "INV-9007", dateCompleted: "06/25/2026", materialCost: 1250, materialPrice: 1900, laborCost: 1440, totalLabor: 2400, totalInvoiced: 5200 },
  { id: "T&M#6219", job: "Montefiore Hospital-1825 Eastchester", dateCompleted: "06/24/2026", materialCost: 108, materialPrice: 180, laborCost: 960, totalLabor: 1600, totalInvoiced: 2100 },
]

export type Warranty = {
  id: string
  customer: string
  description: string
  status: "active" | "completed"
}

export const WARRANTIES: Warranty[] = [
  { id: "T&M#6188", customer: "NY Methodist", description: "Compressor warranty - 90 day labor", status: "active" },
  { id: "Q#12788", customer: "New York Academy Of Medicine", description: "Pumps & VFDs - 1 yr parts", status: "active" },
  { id: "T&M#6104", customer: "DVM Industries - Dykman Clinic", description: "Coil replacement warranty", status: "completed" },
]

export type Timesheet = {
  id: string
  tech: string
  week: string
  totalHours: number
  approved: boolean
  state: "current" | "approved" | "fileroom"
}

export const TIMESHEETS: Timesheet[] = [
  { id: "ts1", tech: "Rony Cali", week: "Jun 28 - Jul 4, 2026", totalHours: 42, approved: false, state: "current" },
  { id: "ts2", tech: "Steven Quiroz", week: "Jun 28 - Jul 4, 2026", totalHours: 40, approved: false, state: "current" },
  { id: "ts3", tech: "Loyd Lall", week: "Jun 21 - Jun 27, 2026", totalHours: 45, approved: true, state: "approved" },
  { id: "ts4", tech: "Lucas Stauffiger", week: "Jun 14 - Jun 20, 2026", totalHours: 41, approved: true, state: "fileroom" },
]

export type Truck = {
  id: string
  driver: string
  number: string
  model: string
  plate: string
  vin: string
  checklists: number
  status: "active" | "pending"
}

export const TRUCKS: Truck[] = [
  { id: "t1", driver: "Rony Cali", number: "Truck 12", model: "Ford Transit 250", plate: "NY-88231", vin: "1FTBW2CM4...9021", checklists: 6, status: "active" },
  { id: "t2", driver: "Steven Quiroz", number: "Truck 8", model: "Ram ProMaster", plate: "NY-44120", vin: "3C6TRVDG5...1188", checklists: 4, status: "active" },
  { id: "t3", driver: "Loyd Lall", number: "Truck 15", model: "Chevy Express", plate: "NY-90211", vin: "1GCWGAFP1...4432", checklists: 2, status: "pending" },
]

export type ActivityLog = {
  id: string
  time: string
  user: string
  action: string
  module: string
  description: string
}

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: "a1", time: "07/02/2026 09:41", user: "ricky", action: "Update", module: "Opportunities", description: "Updated ESA Property Management tie-in note" },
  { id: "a2", time: "07/02/2026 09:12", user: "AL", action: "Create", module: "P.O. System", description: "Created PO #12125 for DVM Industries" },
  { id: "a3", time: "07/01/2026 17:35", user: "Rony Cali", action: "Submit", module: "SAR", description: "Submitted SAR #43657 for NHS US, LLC" },
  { id: "a4", time: "07/01/2026 16:02", user: "Steven Quiroz", action: "Complete", module: "MAR System", description: "Completed MAR line CT-1 at Montefiore" },
  { id: "a5", time: "07/01/2026 14:20", user: "Sean", action: "Approve", module: "Timesheets", description: "Approved timesheet for Loyd Lall" },
]

export function fmtMoney(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
