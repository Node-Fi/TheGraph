import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  FeeChanged,
  OwnershipTransferred,
  Swap
} from "../generated/SwappaRouterV1/SwappaRouterV1"

export function createFeeChangedEvent(
  partnerId: BigInt,
  initiator: Address,
  isAdminFee: boolean,
  oldFee: BigInt,
  newFee: BigInt
): FeeChanged {
  let feeChangedEvent = changetype<FeeChanged>(newMockEvent())

  feeChangedEvent.parameters = new Array()

  feeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "partnerId",
      ethereum.Value.fromUnsignedBigInt(partnerId)
    )
  )
  feeChangedEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )
  feeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "isAdminFee",
      ethereum.Value.fromBoolean(isAdminFee)
    )
  )
  feeChangedEvent.parameters.push(
    new ethereum.EventParam("oldFee", ethereum.Value.fromUnsignedBigInt(oldFee))
  )
  feeChangedEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return feeChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSwapEvent(
  sender: Address,
  to: Address,
  input: Address,
  output: Address,
  inputAmount: BigInt,
  outputAmount: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("input", ethereum.Value.fromAddress(input))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("output", ethereum.Value.fromAddress(output))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "inputAmount",
      ethereum.Value.fromUnsignedBigInt(inputAmount)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "outputAmount",
      ethereum.Value.fromUnsignedBigInt(outputAmount)
    )
  )

  return swapEvent
}
