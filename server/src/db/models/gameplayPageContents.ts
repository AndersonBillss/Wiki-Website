import mongoose, { Document, Schema } from 'mongoose';

interface IPageContent extends Document {
  title: string;
  contents: Array<any>;
}

const PageContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  contents: { type: Array, required: true }
});

const GameplayPageContents = mongoose.model<IPageContent>('Gameplay', PageContentSchema);

export default GameplayPageContents;