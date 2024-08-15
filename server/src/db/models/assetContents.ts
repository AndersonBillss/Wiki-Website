import mongoose, { Document, Schema } from 'mongoose';

interface IAssetContent extends Document {
  title: string;
  tags: Array<any>;
  contents: Array<any>;
  _id: string;
}

const AssetContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array, required: true },
  contents: {type: Array, required: true}
});

const AssetContent = mongoose.model<IAssetContent>('Asset Folders', AssetContentSchema);

export default AssetContent;