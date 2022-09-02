
import {
  Swap
} from "../generated/SwappaRouterV1/SwappaRouterV1"

import { BigInt, log } from "@graphprotocol/graph-ts"
import {  DailyVolume, MonthlyVolume,  YearlyVolume, SwapEntity, Tenant, Token } from "../generated/schema"
import {ONE, SECONDS_IN_DAY, ZERO} from "./constants";
import {toBigInt} from "./utils";


export function handleSwap(event: Swap): void {
  

  // DATE CONVERSIONS 
  let unixEpoch: BigInt = event.block.timestamp;
  let daysSinceEpochStart = unixEpoch / SECONDS_IN_DAY;
  daysSinceEpochStart = daysSinceEpochStart + toBigInt(719468);
  let era: BigInt = (daysSinceEpochStart >= ZERO ? daysSinceEpochStart : daysSinceEpochStart - toBigInt(146096)) / toBigInt(146097);
  let dayOfEra: BigInt = (daysSinceEpochStart - era * toBigInt(146097));          // [0, 146096]
  let yearOfEra: BigInt = (dayOfEra - dayOfEra/toBigInt(1460) + dayOfEra/toBigInt(36524) - dayOfEra/toBigInt(146096)) / toBigInt(365);  // [0, 399]
  let year: BigInt = yearOfEra + (era * toBigInt(400));
  let dayOfYear: BigInt = dayOfEra - (toBigInt(365)*yearOfEra + yearOfEra/toBigInt(4) - yearOfEra/toBigInt(100));                // [0, 365]
  let monthZeroIndexed = (toBigInt(5)*dayOfYear + toBigInt(2))/toBigInt(153);                                   // [0, 11]
  let day = dayOfYear - (toBigInt(153)*monthZeroIndexed+toBigInt(2))/toBigInt(5) + toBigInt(1);                             // [1, 31]
  let month = monthZeroIndexed + (monthZeroIndexed < toBigInt(10) ? toBigInt(3) : toBigInt(-9));                            // [1, 12]
  year = month <= toBigInt(2) ? year + ONE : year;


  // VARIABLES 
  let total_volume = event.params.inputAmount
  let token_id =  (event.params.input).toHexString()
  let datetime = event.block.timestamp
  let transaction_ = event.transaction.from.toHex()
  let tenant_id =  "10"//event.params.
  let sender = (event.params.sender).toHexString()
  let to = (event.params.to).toHexString()
  let output = (event.params.output).toHexString()
  let outputAmount =  event.params.outputAmount
  let day_string = day.toString() + "-" + month.toString() + "-" + year.toString() 
  let month_string =  month.toString() + "-" + year.toString() 
  let year_string = year.toString()
  

// SWAP ENTITY 
  let swapentity = SwapEntity.load(transaction_)
  if (!swapentity)
  {
    swapentity = new SwapEntity(transaction_)
    swapentity.id = datetime.toString()
    swapentity.sender = sender
    swapentity.to = to
    swapentity.input = token_id
    swapentity.output = output
    swapentity.inputAmount =  total_volume
    swapentity.outputAmount =  outputAmount
    swapentity.tenantId =  toBigInt(10) //event.params.partnerId
    swapentity.date = datetime
  }
  swapentity.save()

// TOKEN ENTITY 
  let token_entity = Token.load(token_id)
  if (token_entity == null)
  {
    token_entity = new Token(transaction_)
    token_entity.id = token_id
    token_entity.totalVolumeUSD = total_volume
    token_entity.daily_volume = new Array<string>(0)
    token_entity.monthly_volume = new Array<string>(0)
    token_entity.yearly_volume = new Array<string>(0)
  } 
  else 
  {
    token_entity.totalVolumeUSD = token_entity.totalVolumeUSD.plus(total_volume)
  }

  // TENANT ENTITY 
  let tenant_entity = Tenant.load(tenant_id)
  if (tenant_entity == null)
  {
    tenant_entity = new Tenant(transaction_)
    tenant_entity.daily_volume = new Array<string>(0)
    tenant_entity.monthly_volume = new Array<string>(0)
    tenant_entity.yearly_volume = new Array<string>(0)
    tenant_entity.id = tenant_id
    tenant_entity.totalVolumeUSD = total_volume
  } 
  else 
  {
    tenant_entity.totalVolumeUSD = tenant_entity.totalVolumeUSD.plus(total_volume)
  }

  // DAILY ENTITY 
  let daily_entity_tenant = createDailyEntity(day_string, tenant_id, token_id, "tenant", transaction_, datetime.toString(), total_volume)
  daily_entity_tenant.save()
  let daily_entity_token = createDailyEntity(day_string, tenant_id, token_id, "token", transaction_, datetime.toString(), total_volume)
  daily_entity_token.save()

  // MONTHLY ENTITY 
  let monthly_entity_tenant = createMonthlyEntity(month_string, tenant_id, token_id, "tenant", transaction_, datetime.toString(), total_volume)
  monthly_entity_tenant.save()
  let monthly_entity_token = createMonthlyEntity(month_string, tenant_id, token_id, "token", transaction_, datetime.toString(), total_volume)
  monthly_entity_token.save()

  // YEARLY ENTITY 
  let yearly_entity_tenant = createYearlyEntity(year_string, tenant_id, token_id, "tenant", transaction_, datetime.toString(), total_volume)
  yearly_entity_tenant.save()
  let yearly_entity_token = createYearlyEntity(year_string, tenant_id, token_id, "token", transaction_, datetime.toString(), total_volume)
  yearly_entity_token.save()



  // UPDATING TENANT + TOKEN 
  let day_list_tenant = tenant_entity.daily_volume
  day_list_tenant.push(daily_entity_tenant.id)
  tenant_entity.daily_volume = day_list_tenant

  let day_list_token = token_entity.daily_volume
  day_list_token.push(daily_entity_token.id)
  token_entity.daily_volume = day_list_token


  let month_list_tenant = tenant_entity.monthly_volume
  month_list_tenant.push(monthly_entity_tenant.id)
  tenant_entity.monthly_volume = month_list_tenant

  let month_list_token = token_entity.monthly_volume
  month_list_token.push(monthly_entity_token.id)
  token_entity.monthly_volume = month_list_token

  let year_list_tenant = tenant_entity.yearly_volume
  year_list_tenant.push(yearly_entity_tenant.id)
  tenant_entity.yearly_volume = year_list_tenant

  let year_list_token = token_entity.yearly_volume
  year_list_token.push(yearly_entity_token.id)
  token_entity.yearly_volume = year_list_token

  token_entity.save()
  tenant_entity.save()

}


export function createDailyEntity(day: String, tenant: String, token: String, type: String, transaction: string, date: string, total_volume: BigInt): DailyVolume {
  
  let id  = tenant + "-" + day
  if (type == "token"){
    id = token + "-" + day
  }

  let daily_entity = DailyVolume.load(id)
  if (!daily_entity)
  {
    daily_entity = new DailyVolume(transaction)
    daily_entity.id = id
    daily_entity.timestamp = date
    daily_entity.day = day.toString()
  }
  
  let day_volume = DailyVolume.load(id)
  daily_entity.totalVolumeUSD = total_volume
  if (day_volume != null)
  {
    daily_entity.totalVolumeUSD = daily_entity.totalVolumeUSD.plus(day_volume.totalVolumeUSD)
  }
  
return daily_entity as DailyVolume
}


export function createMonthlyEntity(month: String, tenant: String, token: String, type: String, transaction: string, date: string, total_volume: BigInt): MonthlyVolume {
  
  let id  = tenant + "-" + month
  if (type == "token"){
    id = token + "-" + month
  }

  let monthly_entity = MonthlyVolume.load(id)
  if (!monthly_entity)
  {
    monthly_entity = new MonthlyVolume(transaction)
    monthly_entity.id = id
    monthly_entity.timestamp = date
    monthly_entity.month = month.toString()
  }
  
  let month_volume = MonthlyVolume.load(id)
  monthly_entity.totalVolumeUSD = total_volume
  if (month_volume != null)
  {
    monthly_entity.totalVolumeUSD = monthly_entity.totalVolumeUSD.plus(month_volume.totalVolumeUSD)
  }
  
return monthly_entity as MonthlyVolume
}


export function createYearlyEntity(year: String, tenant: String, token: String, type: String, transaction: string, date: string, total_volume: BigInt): YearlyVolume {
  
  let id  = tenant + "-" + year
  if (type == "token"){
    id = token + "-" + year
  }

  let yearly_entity = YearlyVolume.load(id)
  if (!yearly_entity)
  {
    yearly_entity = new YearlyVolume(transaction)
    yearly_entity.id = id
    yearly_entity.timestamp = date
    yearly_entity.year = year.toString()
  }
  
  let year_volume = YearlyVolume.load(id)
  yearly_entity.totalVolumeUSD = total_volume
  if (year_volume != null)
  {
    yearly_entity.totalVolumeUSD = yearly_entity.totalVolumeUSD.plus(year_volume.totalVolumeUSD)
  }
  
return yearly_entity as YearlyVolume
}





