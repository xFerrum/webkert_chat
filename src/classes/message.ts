export class Message
{
    sentBy: String;
    content: String;
    toRoom: String;
    date: Date;

    constructor(sentBy: string, content: string, toRoom: string, date: Date)
    {
        this.sentBy = sentBy;
        this.content = content;
        this.toRoom = toRoom;
        this.date = date;
    }
}