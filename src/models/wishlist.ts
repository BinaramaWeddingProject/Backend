import mongoose, { Schema, Document, Types } from 'mongoose';

// Define interface for wishlist item
interface WishlistItem {
    itemId: Types.ObjectId;
    itemType: 'vendor' | 'venue'; // Indicates whether the item is a vendor or venue
    selected: boolean; // Indicates whether the user has selected or unselected the item
}

// Define interface for wishlist document
interface Wishlist extends Document {
    userId: Types.ObjectId;
    items: WishlistItem[];
}

// Define schema for wishlist item
const wishlistItemSchema = new Schema<WishlistItem>({
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['vendor', 'venue'], required: true },
    selected: { type: Boolean, default: false } // Default to unselected
});

// Define schema for wishlist document
const wishlistSchema = new Schema<Wishlist>({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: { type: [wishlistItemSchema], default: [] }
});

// Create model for Wishlist
const WishlistModel = mongoose.model<Wishlist>('Wishlist', wishlistSchema);

export default WishlistModel;
