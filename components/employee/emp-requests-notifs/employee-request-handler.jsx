//Contains:
// 1) Firebase modifier to add new requests to collection
// 2) On-startup call to check an employees "inbox" for request updates
// *3) Could hold request list here

//Imports for request type (possibly request list)
import { db } from "@/lib/firebase";

//Adds new request to requests collection
const addRequest = async (requestData) => {
    try {
        await db.collection('requests').add(requestData);
        console.log('Request submission success');
    } catch (error) {
        console.error('Error in request submission');
    }
};

//Updates existing request 
// (For example, if the status of a request has changed to approved or denied over pending)
const updateRequest = async (requestID, newData) => {
    try {
        await db.collection('requests').doc(requestID).update(newData);
        console.log('Request updated');
    } catch (error) {
        console.error('Error updating request', error);
    }
};

//Deletes request from collection
// Will come into play after a request has been 'marked as read'
const deleteRequest = async (requestID) => {
    try {
        await db.collection('requests').doc(requestID).delete();
        console.log('Request successfully deleted');
    } catch (error) {
        console.error('Error deleting request', error);
    }
};

//Request example
const sampleRequest = {
    
    //Each request will have unique ID
    requestID: '123',
    
    //Each request can be one of:
    // - PRF, for preference changes
    // - SWP, for shift swap 
    // - PTO, for paid time off
    // - UTO, for unpaid time off
    requestType: 'PRF',
    
    //Each request has a status:
    // - PEN, for pending requests that will appear manager side
    // - CON, for confirmed requests that will reappear employee side
    // - DEN, for denied requests that will also reappear to employee
    //Once a request has been acknowledged, it will be deleted
    requestStatus: 'PEN'
}

// on-start inbox run (takes in token){
    //check for employee token
    //check who it is
    //if requests
     //show them
//}