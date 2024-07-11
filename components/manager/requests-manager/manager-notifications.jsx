const getAllRequests = async () => {
    try {
        const snapshot = await db.collection('requests').get();
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        console.log('All requests: ', requests);
        return requests;
    } catch (error) {
        console.error('Error retrieving requests', error);
        return [];
    }
}