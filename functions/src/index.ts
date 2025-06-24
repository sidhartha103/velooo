import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const addMessage = onRequest(async (request, response) => {
  logger.info("addMessage function triggered!", {structuredData: true});

  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const message = request.body.message;

  if (!message) {
    response.status(400).send("Message is required in the request body.");
    return;
  }

  try {
    const docRef = await db.collection("messages").add({
      text: message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    logger.info(`Message with ID: ${docRef.id} added to Firestore.`);
    response.status(200).json({
      id: docRef.id,
      message: "Message added successfully!",
    });
  } catch (error) {
    logger.error("Error adding message to Firestore:", error);
    response.status(500).send("Error adding message to Firestore.");
  }
});

export const getMessages = onRequest(async (request, response) => {
  logger.info("getMessages function triggered!", {structuredData: true});

  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const messagesSnapshot = await db.collection("messages")
      .orderBy("timestamp", "desc").get();
    const messages: FirebaseFirestore.DocumentData[] = [];
    messagesSnapshot.forEach((doc) => {
      messages.push({id: doc.id, ...doc.data()});
    });
    response.status(200).json(messages);
  } catch (error) {
    logger.error("Error getting messages from Firestore:", error);
    response.status(500).send("Error getting messages from Firestore.");
  }
});
