
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pool {
  id: number;
  name: string;
  symbol: string;
  userDeposit: number;
  userEarned: number;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: Pool | null;
}

const WithdrawModal = ({ isOpen, onClose, pool }: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!pool) return null;

  const withdrawAmount = parseFloat(amount) || 0;
  const maxWithdraw = pool.userDeposit + pool.userEarned;
  const isMaxWithdraw = withdrawAmount === maxWithdraw;

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount > maxWithdraw) {
      toast({
        title: "Insufficient Balance",
        description: `Maximum withdrawal amount is ${maxWithdraw.toFixed(4)} ${pool.symbol}`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Withdrawal Successful!",
        description: `Successfully withdrew ${amount} ${pool.symbol} from ${pool.name}`,
      });
      setIsLoading(false);
      setAmount("");
      onClose();
    }, 2000);
  };

  const setMaxAmount = () => {
    setAmount(maxWithdraw.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-400" />
            Withdraw from {pool.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Withdraw your {pool.symbol} tokens and earned interest
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Balance Info */}
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Principal</div>
                  <div className="text-white font-semibold">
                    {pool.symbol === 'USDC' ? `$${pool.userDeposit.toLocaleString()}` : `${pool.userDeposit} ${pool.symbol}`}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Earned Interest</div>
                  <div className="text-green-400 font-semibold">
                    {pool.symbol === 'USDC' ? `$${pool.userEarned.toFixed(2)}` : `${pool.userEarned.toFixed(4)} ${pool.symbol}`}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Available to Withdraw</span>
                  <span className="text-white font-semibold">
                    {pool.symbol === 'USDC' ? `$${maxWithdraw.toFixed(2)}` : `${maxWithdraw.toFixed(4)} ${pool.symbol}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="withdrawAmount" className="text-white">Withdrawal Amount</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={setMaxAmount}
                className="text-blue-400 hover:text-blue-300 h-auto p-0"
              >
                Max
              </Button>
            </div>
            <div className="relative">
              <Input
                id="withdrawAmount"
                type="number"
                placeholder={`0.00 ${pool.symbol}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pr-16"
                max={maxWithdraw}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {pool.symbol}
              </div>
            </div>
          </div>

          {/* Warning for full withdrawal */}
          {isMaxWithdraw && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Full Position Withdrawal</span>
                </div>
                <p className="text-orange-300 text-sm mt-1">
                  You're withdrawing your entire position. You'll stop earning yield on this pool.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Withdrawal Breakdown */}
          {withdrawAmount > 0 && (
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Principal Amount</span>
                    <span className="text-white">
                      {pool.symbol === 'USDC' 
                        ? `$${Math.min(withdrawAmount, pool.userDeposit).toFixed(2)}`
                        : `${Math.min(withdrawAmount, pool.userDeposit).toFixed(4)} ${pool.symbol}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Interest Earned</span>
                    <span className="text-green-400">
                      {pool.symbol === 'USDC'
                        ? `$${Math.min(Math.max(0, withdrawAmount - pool.userDeposit), pool.userEarned).toFixed(2)}`
                        : `${Math.min(Math.max(0, withdrawAmount - pool.userDeposit), pool.userEarned).toFixed(4)} ${pool.symbol}`
                      }
                    </span>
                  </div>
                  <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold">
                    <span className="text-white">Total Withdrawal</span>
                    <span className="text-white">
                      {pool.symbol === 'USDC' 
                        ? `$${withdrawAmount.toFixed(2)}`
                        : `${withdrawAmount.toFixed(4)} ${pool.symbol}`
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw}
              disabled={isLoading || !amount || parseFloat(amount) <= 0 || withdrawAmount > maxWithdraw}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Withdraw {pool.symbol}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
