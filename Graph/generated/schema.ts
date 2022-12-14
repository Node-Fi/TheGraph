// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class SwapEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SwapEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SwapEntity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SwapEntity", id.toString(), this);
    }
  }

  static load(id: string): SwapEntity | null {
    return changetype<SwapEntity | null>(store.get("SwapEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get input(): string {
    let value = this.get("input");
    return value!.toString();
  }

  set input(value: string) {
    this.set("input", Value.fromString(value));
  }

  get output(): string {
    let value = this.get("output");
    return value!.toString();
  }

  set output(value: string) {
    this.set("output", Value.fromString(value));
  }

  get inputAmount(): BigInt {
    let value = this.get("inputAmount");
    return value!.toBigInt();
  }

  set inputAmount(value: BigInt) {
    this.set("inputAmount", Value.fromBigInt(value));
  }

  get outputAmount(): BigInt {
    let value = this.get("outputAmount");
    return value!.toBigInt();
  }

  set outputAmount(value: BigInt) {
    this.set("outputAmount", Value.fromBigInt(value));
  }

  get tenantId(): BigInt {
    let value = this.get("tenantId");
    return value!.toBigInt();
  }

  set tenantId(value: BigInt) {
    this.set("tenantId", Value.fromBigInt(value));
  }

  get date(): BigInt | null {
    let value = this.get("date");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set date(value: BigInt | null) {
    if (!value) {
      this.unset("date");
    } else {
      this.set("date", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Tenant extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Tenant entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Tenant must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Tenant", id.toString(), this);
    }
  }

  static load(id: string): Tenant | null {
    return changetype<Tenant | null>(store.get("Tenant", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    return value!.toBigInt();
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }

  get daily_volume(): Array<string> {
    let value = this.get("daily_volume");
    return value!.toStringArray();
  }

  set daily_volume(value: Array<string>) {
    this.set("daily_volume", Value.fromStringArray(value));
  }

  get monthly_volume(): Array<string> {
    let value = this.get("monthly_volume");
    return value!.toStringArray();
  }

  set monthly_volume(value: Array<string>) {
    this.set("monthly_volume", Value.fromStringArray(value));
  }

  get yearly_volume(): Array<string> {
    let value = this.get("yearly_volume");
    return value!.toStringArray();
  }

  set yearly_volume(value: Array<string>) {
    this.set("yearly_volume", Value.fromStringArray(value));
  }
}

export class DailyVolume extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DailyVolume entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DailyVolume must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DailyVolume", id.toString(), this);
    }
  }

  static load(id: string): DailyVolume | null {
    return changetype<DailyVolume | null>(store.get("DailyVolume", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): string {
    let value = this.get("timestamp");
    return value!.toString();
  }

  set timestamp(value: string) {
    this.set("timestamp", Value.fromString(value));
  }

  get day(): string {
    let value = this.get("day");
    return value!.toString();
  }

  set day(value: string) {
    this.set("day", Value.fromString(value));
  }

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    return value!.toBigInt();
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }
}

export class MonthlyVolume extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MonthlyVolume entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MonthlyVolume must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MonthlyVolume", id.toString(), this);
    }
  }

  static load(id: string): MonthlyVolume | null {
    return changetype<MonthlyVolume | null>(store.get("MonthlyVolume", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): string {
    let value = this.get("timestamp");
    return value!.toString();
  }

  set timestamp(value: string) {
    this.set("timestamp", Value.fromString(value));
  }

  get month(): string {
    let value = this.get("month");
    return value!.toString();
  }

  set month(value: string) {
    this.set("month", Value.fromString(value));
  }

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    return value!.toBigInt();
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }
}

export class YearlyVolume extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save YearlyVolume entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type YearlyVolume must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("YearlyVolume", id.toString(), this);
    }
  }

  static load(id: string): YearlyVolume | null {
    return changetype<YearlyVolume | null>(store.get("YearlyVolume", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): string {
    let value = this.get("timestamp");
    return value!.toString();
  }

  set timestamp(value: string) {
    this.set("timestamp", Value.fromString(value));
  }

  get year(): string {
    let value = this.get("year");
    return value!.toString();
  }

  set year(value: string) {
    this.set("year", Value.fromString(value));
  }

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    return value!.toBigInt();
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    return value!.toBigInt();
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }

  get daily_volume(): Array<string> {
    let value = this.get("daily_volume");
    return value!.toStringArray();
  }

  set daily_volume(value: Array<string>) {
    this.set("daily_volume", Value.fromStringArray(value));
  }

  get monthly_volume(): Array<string> {
    let value = this.get("monthly_volume");
    return value!.toStringArray();
  }

  set monthly_volume(value: Array<string>) {
    this.set("monthly_volume", Value.fromStringArray(value));
  }

  get yearly_volume(): Array<string> {
    let value = this.get("yearly_volume");
    return value!.toStringArray();
  }

  set yearly_volume(value: Array<string>) {
    this.set("yearly_volume", Value.fromStringArray(value));
  }
}
