
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, Percent, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pool {
  id: number;
  name: string;
  symbol: string;
  currentAPY: number;
  utilizationRate: number;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  pool: Pool | null;
}

const DepositModal = ({ isOpen, onClose, pool }: DepositModalProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!pool) return null;

  const calculateEarnings = (amount: number, apy: number, days: number) => {
    return (amount * (apy / 100) * (days / 365));
  };

  const depositAmount = parseFloat(amount) || 0;
  const earnings30d = calculateEarnings(depositAmount, pool.currentAPY, 30);
  const earnings90d = calculateEarnings(depositAmount, pool.currentAPY, 90);
  const earnings365d = calculateEarnings(depositAmount, pool.currentAPY, 365);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Deposit Successful!",
        description: `Successfully deposited ${amount} ${pool.symbol} to ${pool.name}`,
      });
      setIsLoading(false);
      setAmount("");
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Deposit to {pool.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Earn {pool.currentAPY}% APY by lending your {pool.symbol} tokens
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pool Info */}
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Current APY</div>
                  <div className="text-green-400 font-semibold">{pool.currentAPY}%</div>
                </div>
                <div>
                  <div className="text-slate-400">Utilization</div>
                  <div className="text-white font-semibold">{pool.utilizationRate}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Deposit Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder={`0.00 ${pool.symbol}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pr-16"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {pool.symbol}
              </div>
            </div>
          </div>

          {/* Earnings Calculator */}
          {depositAmount > 0 && (
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Projected Earnings</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-white font-semibold">
                      {pool.symbol === 'USDC' ? `$${earnings30d.toFixed(2)}` : `${earnings30d.toFixed(4)} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400">30 days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">
                      {pool.symbol === 'USDC' ? `$${earnings90d.toFixed(2)}` : `${earnings90d.toFixed(4)} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400">90 days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">
                      {pool.symbol === 'USDC' ? `$${earnings365d.toFixed(2)}` : `${earnings365d.toFixed(3)} ${pool.symbol}`}
                    </div>
                    <div className="text-slate-400">1 year</div>
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
              onClick={handleDeposit}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Deposit {pool.symbol}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
