import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Debug route is working!',
    timestamp: new Date().toISOString(),
    status: 'success',
    environment: process.env.NODE_ENV,
    preview_secret_exists: !!process.env.PREVIEW_SECRET
  })
}