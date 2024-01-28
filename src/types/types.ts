import { IMyProfileData, IUserProfileData } from "./apiTypes";

export type TPost = "HOME" | "FEED" | "PROFILE";
export type TLogin = "GOOGLE" | "GITHUB";
export type TError = Error | null;
export type TFindAccountMenu = "EMAIL" | "PASSWORD";
export type TProfile = IMyProfileData | IUserProfileData;
export type TDuplication = "EMAIL" | "PHONE" | "DISPLAYNAME";

export enum EMapContentType {
  MAP = "MAP",
  LIST = "LIST"
}
