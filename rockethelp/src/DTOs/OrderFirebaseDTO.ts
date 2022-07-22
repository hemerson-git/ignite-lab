import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface OrderFirebaseDTO {
  patrimonyNumber: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
}
