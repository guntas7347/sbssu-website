import { NextResponse } from "next/server";

export function send(
  code: number,
  message: string,
  payload: any = null,
  headers?: Headers,
) {
  return NextResponse.json(
    { code, message, payload },
    { status: code, headers },
  );
}
