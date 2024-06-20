import mongoose, { Document, Schema } from 'mongoose';

interface IConceptContent extends Document {
  title: string;
  contents: Array<any>;
}

const ConceptContentSchema: Schema = new Schema({
  highResSrc: { type: String, required: true },
  medResSrc: { type: String, required: true },
  lowResSrc: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: Array, required: true }
});

const ConceptContent = mongoose.model<IConceptContent>('Concept', ConceptContentSchema);

export default ConceptContent;