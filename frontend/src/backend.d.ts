import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Filter {
    sortBy?: SortBy;
    searchTerm?: string;
}
export interface IdCardRequest {
    memberId: bigint;
    timestamp: bigint;
    requestedBy?: Principal;
}
export interface FileData {
    base64Data: string;
    fileName: string;
    fileSize: bigint;
}
export interface Member {
    id: bigint;
    occupation: string;
    country: string;
    gramPanchayat: string;
    ownerPrincipal?: Principal;
    aadhaarCardPhoto: FileData;
    policeStation: string;
    email: string;
    district: string;
    whatsappNumber: string;
    state: string;
    village: string;
    gender: Gender;
    timestamp: bigint;
    contactNumber: string;
    photo: FileData;
    fullAddress: string;
    hashedPassword: string;
    tehsil: string;
    lastName: string;
    firstName: string;
}
export interface UserProfile {
    name: string;
}
export interface LoginActivity {
    memberId: bigint;
    timestamp: bigint;
    successful: boolean;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum SortBy {
    timestampAsc = "timestampAsc",
    lastNameAsc = "lastNameAsc",
    lastNameDesc = "lastNameDesc",
    timestampDesc = "timestampDesc"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllIdCardRequests(): Promise<Array<IdCardRequest>>;
    getAllLoginActivities(): Promise<Array<LoginActivity>>;
    getAllMembers(filter: Filter | null): Promise<Array<Member>>;
    getCallerMember(): Promise<Member | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getIsCallerAdmin(): Promise<boolean>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginMember(emailOrPhone: string, password: string): Promise<bigint | null>;
    registerMember(member: Member): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitIdCardRequest(memberId: bigint): Promise<void>;
}
