const retrieveDocuments = async ({
                                     request: {
                                         criteria,
                                     },
                                     data: {
                                         getDocumentsBy,
                                     },
                                     response: {
                                         respondWithNoDocuments,
                                         respondWithFoundDocuments,
                                         respondWithError,
                                     },
                                 }) => {
    try {
        const documents = await getDocumentsBy(criteria)
        if (!documents || !documents.length) {
            return respondWithNoDocuments()
        }
        
        respondWithFoundDocuments(documents)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = retrieveDocuments
