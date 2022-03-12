/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Chatroom {
  export type MessageStruct = {
    sender: string;
    content: string;
    timestamp: BigNumberish;
  };

  export type MessageStructOutput = [string, string, BigNumber] & {
    sender: string;
    content: string;
    timestamp: BigNumber;
  };
}

export interface ChatroomInterface extends utils.Interface {
  contractName: "Chatroom";
  functions: {
    "getChat(address)": FunctionFragment;
    "isUser(address)": FunctionFragment;
    "sendMessage(address,string)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "getChat", values: [string]): string;
  encodeFunctionData(functionFragment: "isUser", values: [string]): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [string, string]
  ): string;

  decodeFunctionResult(functionFragment: "getChat", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isUser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Chatroom extends BaseContract {
  contractName: "Chatroom";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChatroomInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getChat(
      to: string,
      overrides?: CallOverrides
    ): Promise<[Chatroom.MessageStructOutput[]]>;

    isUser(user: string, overrides?: CallOverrides): Promise<[boolean]>;

    sendMessage(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getChat(
    to: string,
    overrides?: CallOverrides
  ): Promise<Chatroom.MessageStructOutput[]>;

  isUser(user: string, overrides?: CallOverrides): Promise<boolean>;

  sendMessage(
    to: string,
    message: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getChat(
      to: string,
      overrides?: CallOverrides
    ): Promise<Chatroom.MessageStructOutput[]>;

    isUser(user: string, overrides?: CallOverrides): Promise<boolean>;

    sendMessage(
      to: string,
      message: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getChat(to: string, overrides?: CallOverrides): Promise<BigNumber>;

    isUser(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    sendMessage(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getChat(
      to: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isUser(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendMessage(
      to: string,
      message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}