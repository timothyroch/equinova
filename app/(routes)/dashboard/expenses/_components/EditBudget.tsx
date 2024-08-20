'use client';

import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Budgets } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

interface BudgetInfo {
  name: string;
  amount: number;
  icon: string;
  id: number;
}

const EditBudget = ({ budgetInfo, refreshData }: { budgetInfo?: BudgetInfo, refreshData: () => void }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon ||"😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState<string>(budgetInfo?.name || "");
  const [amount, setAmount] = useState<number>(budgetInfo?.amount || 0);

  const { user } = useUser();

  const onUpdateBudget = async() => {
    const result=await db.update(Budgets).set({
      name:name,
      amount:amount,
      icon:emojiIcon,
    }).where(eq(Budgets.id,budgetInfo?.id))
    .returning();

    if(result)
    {
      refreshData()
      toast('Budget Updated!')
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button
                  variant="outline"
                  size="lg"
                  className='text-lg'
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className='absolute z-20'>
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input
                    placeholder='e.g. Home Decor'
                    defaultValue={budgetInfo?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder='e.g. 5000$'
                    defaultValue={budgetInfo?.amount?.toString() || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className='mt-5 w-full'
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;

