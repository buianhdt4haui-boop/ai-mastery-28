"use client";

import { toast } from "sonner";
import {
  Users,
  ShoppingCart,
  BookOpen,
  Banknote,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { curriculum } from "@/data/curriculum";
import { formatVnd } from "@/data/pricing";
import { formatDateVi } from "@/lib/format";
import { useStore } from "@/lib/use-store";
import { getOrders, updateOrderStatus } from "@/lib/progress";
import type { Order, OrderStatus } from "@/types";

const statusMeta: Record<OrderStatus, { label: string; className: string }> = {
  paid: { label: "Đã thanh toán", className: "bg-primary/15 text-primary" },
  pending: { label: "Chờ xử lý", className: "bg-yellow-500/15 text-yellow-400" },
  cancelled: { label: "Đã hủy", className: "bg-destructive/15 text-destructive" },
};

export function AdminClient({
  remoteOrders = null,
}: {
  /** Đơn hàng đọc từ Supabase (service role). Khi có, hiển thị read-only. */
  remoteOrders?: Order[] | null;
}) {
  const localOrders = useStore(getOrders, [] as Order[]);
  const orders = remoteOrders ?? localOrders;
  const readOnly = remoteOrders !== null;

  const paidOrders = orders.filter((o) => o.status === "paid");
  const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const students = new Map(orders.map((o) => [o.email, o]));

  const stats = [
    { icon: Banknote, label: "Doanh thu (đã TT)", value: formatVnd(revenue) },
    { icon: ShoppingCart, label: "Đơn hàng", value: String(orders.length) },
    { icon: Users, label: "Học viên", value: String(students.size) },
    { icon: BookOpen, label: "Bài học", value: String(curriculum.length) },
  ];

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Quản trị</h1>
      <p className="mt-1 text-muted-foreground">
        Bảng điều khiển cơ bản — dữ liệu demo lưu trên thiết bị.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-white/10 bg-card/60">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="mt-10 w-full">
        <TabsList>
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="students">Học viên</TabsTrigger>
          <TabsTrigger value="lessons">Bài học</TabsTrigger>
        </TabsList>

        {/* Orders */}
        <TabsContent value="orders" className="mt-6">
          {orders.length === 0 ? (
            <EmptyState text="Chưa có đơn hàng nào. Hãy thử mua một gói ở trang thanh toán." />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-card/60 text-left text-muted-foreground">
                  <tr>
                    <Th>Mã đơn</Th>
                    <Th>Khách hàng</Th>
                    <Th>Gói</Th>
                    <Th>Số tiền</Th>
                    <Th>Ngày</Th>
                    <Th>Trạng thái</Th>
                    <Th>Thao tác</Th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-white/10">
                      <Td className="font-mono text-xs">{o.id}</Td>
                      <Td>
                        <div className="font-medium">{o.fullName}</div>
                        <div className="text-xs text-muted-foreground">{o.email}</div>
                      </Td>
                      <Td className="capitalize">{o.planId}</Td>
                      <Td>{formatVnd(o.amount)}</Td>
                      <Td className="whitespace-nowrap">{formatDateVi(o.createdAt)}</Td>
                      <Td>
                        <Badge className={statusMeta[o.status].className}>
                          {statusMeta[o.status].label}
                        </Badge>
                      </Td>
                      <Td>
                        {readOnly ? (
                          <span className="text-xs text-muted-foreground">—</span>
                        ) : (
                          <div className="flex gap-1">
                            {o.status !== "paid" && (
                              <Button
                                size="xs"
                                variant="ghost"
                                onClick={() => {
                                  updateOrderStatus(o.id, "paid");
                                  toast.success("Đã đánh dấu thanh toán.");
                                }}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                            {o.status !== "pending" && (
                              <Button
                                size="xs"
                                variant="ghost"
                                onClick={() => updateOrderStatus(o.id, "pending")}
                              >
                                <Clock className="h-3.5 w-3.5" />
                              </Button>
                            )}
                            {o.status !== "cancelled" && (
                              <Button
                                size="xs"
                                variant="ghost"
                                onClick={() => updateOrderStatus(o.id, "cancelled")}
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Students */}
        <TabsContent value="students" className="mt-6">
          {students.size === 0 ? (
            <EmptyState text="Chưa có học viên nào." />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-card/60 text-left text-muted-foreground">
                  <tr>
                    <Th>Họ tên</Th>
                    <Th>Email</Th>
                    <Th>SĐT</Th>
                    <Th>Gói</Th>
                  </tr>
                </thead>
                <tbody>
                  {[...students.values()].map((s) => (
                    <tr key={s.email} className="border-t border-white/10">
                      <Td className="font-medium">{s.fullName}</Td>
                      <Td>{s.email}</Td>
                      <Td>{s.phone}</Td>
                      <Td className="capitalize">{s.planId}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Lessons */}
        <TabsContent value="lessons" className="mt-6">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-card/60 text-left text-muted-foreground">
                <tr>
                  <Th>Ngày</Th>
                  <Th>Tiêu đề</Th>
                  <Th>Công cụ</Th>
                  <Th>Tuần</Th>
                  <Th>Thời lượng</Th>
                </tr>
              </thead>
              <tbody>
                {curriculum.map((d) => (
                  <tr key={d.day} className="border-t border-white/10">
                    <Td>{d.day}</Td>
                    <Td className="font-medium">{d.title}</Td>
                    <Td>{d.tool}</Td>
                    <Td>{d.week}</Td>
                    <Td>{d.estimatedMinutes}′</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Nội dung bài học hiện đến từ seed dữ liệu (src/data/curriculum.ts). Khi tích
            hợp Supabase, bảng này sẽ cho phép thêm/sửa/xóa trực tiếp.
          </p>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className ?? ""}`}>{children}</td>;
}
function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 p-12 text-center text-muted-foreground">
      {text}
    </div>
  );
}
