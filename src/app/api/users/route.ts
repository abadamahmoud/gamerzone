import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    const userOptions = users.map(user => ({ label: user.name, value: user.id , image: user.image}));
    return NextResponse.json(userOptions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
