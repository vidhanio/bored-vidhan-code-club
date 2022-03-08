/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VidhanChatroomInterface extends ethers.utils.Interface {
  functions: {
    "getMessages(address)": FunctionFragment;
    "join()": FunctionFragment;
    "leave()": FunctionFragment;
    "send(address,string)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "getMessages", values: [string]): string;
  encodeFunctionData(functionFragment: "join", values?: undefined): string;
  encodeFunctionData(functionFragment: "leave", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "send",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "join", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "leave", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "send", data: BytesLike): Result;

  events: {};
}

export class VidhanChatroom extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VidhanChatroomInterface;

  functions: {
    getMessages(
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([string, string, BigNumber] & {
          from: string;
          content: string;
          timestamp: BigNumber;
        })[]
      ] & {
        messages: ([string, string, BigNumber] & {
          from: string;
          content: string;
          timestamp: BigNumber;
        })[];
      }
    >;

    join(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    leave(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    send(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getMessages(
    to: string,
    overrides?: CallOverrides
  ): Promise<
    ([string, string, BigNumber] & {
      from: string;
      content: string;
      timestamp: BigNumber;
    })[]
  >;

  join(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  leave(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  send(
    to: string,
    message: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getMessages(
      to: string,
      overrides?: CallOverrides
    ): Promise<
      ([string, string, BigNumber] & {
        from: string;
        content: string;
        timestamp: BigNumber;
      })[]
    >;

    join(overrides?: CallOverrides): Promise<void>;

    leave(overrides?: CallOverrides): Promise<void>;

    send(to: string, message: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getMessages(to: string, overrides?: CallOverrides): Promise<BigNumber>;

    join(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    leave(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    send(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMessages(
      to: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    join(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    leave(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    send(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}