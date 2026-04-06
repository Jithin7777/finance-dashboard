import React, { useState } from "react";
import { useFinanceStore } from "../../store/financeStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const EditTransactionModal = ({ open, setOpen, transaction }) => {
  const editTransaction = useFinanceStore((state) => state.editTransaction);

  // Initialize form with transaction data when modal opens
  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "expense",
    date: "",
    description: "",
  });

  React.useEffect(() => {
    if (open && transaction) {
      setForm({
        category: transaction?.category || "",
        amount: transaction?.amount?.toString() || "",
        type: transaction?.type || "expense",
        date: transaction?.date || new Date().toISOString().split("T")[0],
        description: transaction?.description || "",
      });
    }
  }, [open, transaction]);

  const handleOpenChange = (value) => {
    setOpen(value);
  };

  const handleSubmit = () => {
    if (!transaction) return;

    if (!form.category || !form.amount || !form.date) {
      toast.error("Please fill all required fields (Category, Amount, Date)");
      return;
    }

    editTransaction(transaction.id, {
      category: form.category,
      amount: Number(form.amount),
      type: form.type,
      date: form.date,
      description: form.description,
    });

    toast.success("Transaction updated successfully");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category *</label>
          <Input
            placeholder="e.g., Groceries, Salary, Rent"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount *</label>
          <Input
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Type *</label>
          <Select
            value={form.type}
            onValueChange={(value) =>
              setForm({
                ...form,
                type: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date *</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (Optional)</label>
          <Input
            placeholder="Add additional notes..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;
