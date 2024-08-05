import mongoose, { Document, Schema } from 'mongoose';

interface IPageContent extends Document {
  title: string;
  contents: Array<any>;
}

const PageContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  contents: { type: Array, required: true }
});

const LorePageContent = mongoose.model<IPageContent>('Lore Page', PageContentSchema);

export default LorePageContent;