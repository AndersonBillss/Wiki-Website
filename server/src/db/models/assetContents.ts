import mongoose, { Document, Schema } from 'mongoose';

interface IAssetContent extends Document {
  title: string;
  contents: Array<any>;
}

const AssetContentSchema: Schema = new Schema({
  highResSrc: { type: String, required: true },
  lowResSrc: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: Array, required: true }
});

const AssetContent = mongoose.model<IAssetContent>('Assets', AssetContentSchema);

export default AssetContent;