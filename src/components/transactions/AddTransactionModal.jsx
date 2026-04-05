import React, { useState } from "react";
import { useFinanceStore } from "../../store/financeStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { toast } from "sonner"; // ✅ import Sonner

const AddTransactionDialog = () => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const role = useFinanceStore((state) => state.role);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const [date, setDate] = useState(null);

  const handleSubmit = () => {
    // ✅ Validation using Sonner
    if (!date || !form.description || !form.category || !form.amount) {
      toast.error("Please fill all fields before adding a transaction");
      return;
    }

    addTransaction({
      id: Date.now(),
      ...form,
      date: format(date, "yyyy-MM-dd"),
      amount: Number(form.amount),
    });

    toast.success("Transaction added successfully 🎉"); // ✅ success toast

    // Reset form
    setForm({
      description: "",
      category: "",
      amount: "",
      type: "expense",
    });
    setDate(null);
    setOpen(false);
  };

  if (role !== "admin") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild>
  <Button className="flex items-center gap-2 bg-white text-black hover:bg-black-700 shadow-md">
    <PlusIcon className="w-5 h-5" />
    Add Transaction
  </Button>
</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Enter description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input
              placeholder="Food / Salary / Travel"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select
              className="w-full border rounded-md p-2"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;