import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OfferEnum } from '../enums/offer.enum';
import { Product } from '../../products/schemes/product.scheme';

class Link {
  @Prop()
  readonly page: string;

  @Prop()
  readonly categoryType: string;

  @Prop()
  readonly categoryValue: string;
}

export type OfferDocument = Offer & Document;

@Schema({
  collection: 'offers',
  timestamps: true,
})
export class Offer {
  @Prop({ required: true, enum: OfferEnum, type: String })
  readonly type: OfferEnum;

  @Prop({ required: true, type: Date })
  readonly expiresDate: string;

  @Prop({ type: Link, default: undefined })
  readonly link: Link;

  @Prop({ default: undefined })
  readonly title: string;

  @Prop({ default: undefined })
  readonly upTitle: string;

  @Prop({ default: undefined })
  readonly text: string;

  @Prop({ default: undefined })
  readonly img: string;

  @Prop({ default: undefined, type: SchemaTypes.ObjectId, ref: Product.name })
  readonly deal: Product;
}

export const OfferScheme = SchemaFactory.createForClass(Offer);

OfferScheme.set('toJSON', {
  transform: function (doc, ret) {
    delete ret['_id'];
    delete ret['__v'];
    return ret;
  },
});
