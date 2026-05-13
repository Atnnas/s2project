import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await SiteSettings.findOne({ key });
      return NextResponse.json({ success: true, data: setting });
    }

    const settings = await SiteSettings.find({});
    return NextResponse.json({ success: true, data: settings });
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
    const { key, value, description } = body;

    const setting = await SiteSettings.findOneAndUpdate(
      { key },
      { value, description },
      { upsert: true, new: true, returnDocument: 'after' }
    );

    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
