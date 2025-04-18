export interface BookRequest {
  bookTitle: string;
  author: string;
  type: 'sent' | 'received'; // Identifica se è una richiesta inviata o ricevuta
  status: 'pending' | 'accepted' | 'rejected'; // Stato della richiesta
}
