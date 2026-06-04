export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';
export type Portal = 'buyer' | 'seller';
export type EscrowStatus = 'NONE' | 'HELD' | 'RELEASED';
export type ActiveScreen = 'onboarding' | 'dashboard' | 'settings';
export type VerificationStatus = 'unverified' | 'verifying' | 'verified';

export interface ReelListing {
  id: string;
  titleEn: string;
  titleBn: string;
  sellerEn: string;
  sellerBn: string;
  sellerRating: number;
  sellerJobs: number;
  locationEn: string;
  locationBn: string;
  distanceKm: number;
  stockEn: string;
  stockBn: string;
  pricePerUnitEn: string;
  pricePerUnitBn: string;
  unitEn: string;
  unitBn: string;
  category: string;
  zoneEn: 'Flash' | 'Buffer' | 'Vault';
  zoneBn: 'ফ্ল্যাশ' | 'বাফার' | 'ভল্ট';
  zoneDescEn: string;
  zoneDescBn: string;
  bgGradient: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userEn: string;
  userBn: string;
  textEn: string;
  textBn: string;
  timeEn: string;
  timeBn: string;
}

export interface SAAOInfo {
  nameEn: string;
  nameBn: string;
  designationEn: string;
  designationBn: string;
  contact: string;
  upazilaEn: string;
  upazilaBn: string;
  districtEn: string;
  districtBn: string;
  avatarUrl: string;
  availabilityEn: string;
  availabilityBn: string;
}

export interface BankAccount {
  bankName: string;
  accountNo: string;
  routingNo: string;
  holderName: string;
  verified: boolean;
}

export interface MfsWallet {
  provider: 'bkash' | 'nagad';
  phone: string;
  verified: boolean;
  balanceBDT: number;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  type: 'text' | 'voice' | 'order_form' | 'order_summary';
  text: string;
  voiceUrl?: string;
  voiceDuration?: number;
  timestamp: string;
  orderFormData?: {
    name: string;
    contact: string;
    address: string;
    quantity: string;
    amount: string;
    unit: string;
    status: 'pending' | 'submitted';
  };
}

export interface BuyerSellerChat {
  listingId: string;
  buyerName: string;
  sellerName: string;
  messages: ChatMessage[];
}

