import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HomeBanner from '@/models/HomeBanner';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectToDatabase();
    const banners = await HomeBanner.find({ active: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Database Connection Failed' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "Admin" && session.user.role !== "Editor")) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const banner = await HomeBanner.create(body);
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "Admin" && session.user.role !== "Editor")) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });

    const updatedBanner = await HomeBanner.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedBanner });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "Admin" && session.user.role !== "Editor")) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });

    await HomeBanner.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
