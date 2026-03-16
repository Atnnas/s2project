import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    await dbConnect();
    const clients = await Client.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'Admin') {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const client = await Client.create(body);
    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'Admin') {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;
    const client = await Client.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'Admin') {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Client.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
