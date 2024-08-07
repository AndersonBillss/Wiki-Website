import mongoose, { Document, Schema } from 'mongoose';

interface IConceptContent extends Document {
  title: string;
  tags: Array<any>;
  _id: string
}

const ConceptContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array, required: true }
});

const ConceptContent = mongoose.model<IConceptContent>('Concept Images', ConceptContentSchema);

export default ConceptContent;