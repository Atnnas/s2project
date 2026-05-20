import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Metric from '@/models/Metric';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const defaultMetrics = [
  { label: "Interacción", value: "+185%", icon: "rebase_edit", order: 1 },
  { label: "Alcance", value: "+42%", icon: "rocket_launch", order: 2 },
  { label: "Seguidores", value: "+1,200", icon: "group_add", order: 3 },
  { label: "Consultas", value: "+35%", icon: "forum", order: 4 },
  { label: "Ventas", value: "+28%", icon: "payments", order: 5 },
  { label: "Visualizaciones", value: "+90K", icon: "visibility", order: 6 }
];

export async function GET(req) {
  try {
    await dbConnect();
    let metrics = await Metric.find({}).sort({ order: 1 });
    
    // Seed automatically if no metrics exist, using atomic upserts to prevent race conditions
    if (metrics.length === 0) {
      for (const def of defaultMetrics) {
        await Metric.findOneAndUpdate(
          { label: def.label },
          { $setOnInsert: def },
          { upsert: true }
        );
      }
      metrics = await Metric.find({}).sort({ order: 1 });
    }
    
    return NextResponse.json({ success: true, data: metrics });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'Admin' && session.user.role !== 'Editor')) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const { id, value, label, icon } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID es requerido' }, { status: 400 });
    }

    const updatedMetric = await Metric.findByIdAndUpdate(
      id, 
      { value, label, icon }, 
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedMetric });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
