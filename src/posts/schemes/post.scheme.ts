import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { PostCategoryEnum } from '../enums/post-category.enum';
import { Comment } from '../../comments/schemes/comment.scheme';
import { Profile } from '../../profiles/schemes/profile.scheme';

export type PostDocument = Post & Document;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Profile.name })
  readonly user: Profile;

  @Prop({ required: true })
  readonly title: string;

  @Prop({ required: true })
  readonly slug: string;

  @Prop({ required: true })
  readonly text: string;

  @Prop({ required: true })
  readonly img: string;

  @Prop({ required: true })
  readonly category: PostCategoryEnum;

  @Prop({ default: undefined })
  readonly tags: [];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Comment.name,
    default: undefined,
  })
  comments: Comment;
}

export const PostScheme = SchemaFactory.createForClass(Post);

PostScheme.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret['_id'];
    delete ret['__v'];
    return ret;
  },
});
