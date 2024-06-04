import mongoose, { Document, Schema } from 'mongoose';

interface IPageContent extends Document {
  title: string;
  contents: Array<any>;
}

const PageContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  contents: { type: Array, required: true }
});

const PageContent = mongoose.model<IPageContent>('Pages', PageContentSchema);

export default PageContent;