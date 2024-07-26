"use Server";
import { db } from "@/lib/firebase";
import { hash, compare } from "bcryptjs";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  deleteDoc,
  query,
} from "firebase/firestore";