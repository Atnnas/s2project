import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ isActive: false, role: null, success: false }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ isActive: false, role: null, success: true });
    }

    return NextResponse.json({ isActive: !!user.isActive, role: user.role, success: true });
  } catch (error) {
    console.error("Error in status API route:", error);
    return NextResponse.json({ isActive: false, role: null, success: false }, { status: 500 });
  }
}
