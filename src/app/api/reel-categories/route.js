import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ReelCategory from '@/models/ReelCategory';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await ReelCategory.find({}).sort({ order: 1, name: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('ReelCategory GET error:', error);
    return NextResponse.json({ success: false, error: 'Error al cargar subcategorías' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'Admin' && session.user.role !== 'Editor')) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await connectToDatabase();
    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: 'El nombre es requerido' }, { status: 400 });
    }

    // Check if already exists (case-insensitive)
    const existing = await ReelCategory.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existing) {
      return NextResponse.json({ success: true, data: existing }); // Return existing silently
    }

    const category = await ReelCategory.create({ name: name.trim() });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('ReelCategory POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'Admin' && session.user.role !== 'Editor')) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID requerido' }, { status: 400 });

    await ReelCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ReelCategory DELETE error:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'Admin' && session.user.role !== 'Editor')) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await connectToDatabase();
    const { id, name } = await req.json();

    if (!id) return NextResponse.json({ success: false, error: 'ID requerido' }, { status: 400 });
    if (!name?.trim()) return NextResponse.json({ success: false, error: 'El nombre es requerido' }, { status: 400 });

    // Check if another exists with same name (case-insensitive)
    const existing = await ReelCategory.findOne({ 
      _id: { $ne: id }, 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
    });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Ya existe otra categoría con este nombre' }, { status: 400 });
    }

    const category = await ReelCategory.findByIdAndUpdate(
      id, 
      { name: name.trim() }, 
      { new: true }
    );
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error('ReelCategory PATCH error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

