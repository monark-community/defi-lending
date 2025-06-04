import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Coins, Users, ArrowRight, DollarSign, PieChart, Activity } from "lucide-react";
import Header from "@/components/Header";
import PoolCard from "@/components/PoolCard";
import StatsCard from "@/components/StatsCard";
import DepositModal from "@/components/DepositModal";
import WithdrawModal from "@/components/WithdrawModal";
import UserPositions from "@/components/UserPositions";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("pools");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);

  // Mock data for demonstration
  const pools = [
    {
      id: 1,
      name: "USDC Lending Pool",
      symbol: "USDC",
      totalDeposits: 2456789.45,
      currentAPY: 8.24,
      utilizationRate: 76.5,
      totalBorrowed: 1879234.12,
      reserves: 245678.90,
      userDeposit: isAuthenticated ? 5000 : 0,
      userEarned: isAuthenticated ? 126.50 : 0,
    },
    {
      id: 2,
      name: "ETH Lending Pool",
      symbol: "ETH",
      totalDeposits: 1234.56,
      currentAPY: 6.45,
      utilizationRate: 68.2,
      totalBorrowed: 842.15,
      reserves: 98.76,
      userDeposit: isAuthenticated ? 2.5 : 0,
      userEarned: isAuthenticated ? 0.045 : 0,
    },
    {
      id: 3,
      name: "WBTC Lending Pool",
      symbol: "WBTC",
      totalDeposits: 45.67,
      currentAPY: 5.89,
      utilizationRate: 72.1,
      totalBorrowed: 32.91,
      reserves: 4.12,
      userDeposit: isAuthenticated ? 0.1 : 0,
      userEarned: isAuthenticated ? 0.002 : 0,
    },
  ];

  const protocolStats = {
    totalValueLocked: 89456723.45,
    totalEarned: 3456789.12,
    activeUsers: 12847,
    totalPools: 8,
  };

  const handleDeposit = (pool) => {
    setSelectedPool(pool);
    setShowDepositModal(true);
  };

  const handleWithdraw = (pool) => {
    setSelectedPool(pool);
    setShowWithdrawModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Decentralized Lending Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Earn Yield on Your
              <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Crypto Assets
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Deposit tokens into our lending pools and earn competitive yields while providing liquidity to borrowers. 
              Powered by smart contracts and optimized interest rate models.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3"
                onClick={() => setIsAuthenticated(true)}
              >
                Connect Wallet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white bg-transparent hover:bg-white/10 px-8 py-3"
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">High Yields</h3>
                <p className="text-slate-400">Earn competitive APY rates based on real-time market demand</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                <p className="text-slate-400">Audited smart contracts with transparent on-chain operations</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Flexible</h3>
                <p className="text-slate-400">Deposit and withdraw at any time with no lock-up periods</p>
              </div>
            </div>

            {/* Protocol Stats */}
            <div className="mt-20 grid md:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white">${(protocolStats.totalValueLocked / 1000000).toFixed(1)}M</div>
                <div className="text-slate-400 text-sm">Total Value Locked</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400">${(protocolStats.totalEarned / 1000000).toFixed(1)}M</div>
                <div className="text-slate-400 text-sm">Total Earned</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400">{(protocolStats.activeUsers / 1000).toFixed(1)}k</div>
                <div className="text-slate-400 text-sm">Active Users</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">{protocolStats.totalPools}</div>
                <div className="text-slate-400 text-sm">Lending Pools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Portfolio Value"
            value={`$${(5000 * 1.45 + 2.5 * 3200 + 0.1 * 65000).toLocaleString()}`}
            icon={DollarSign}
            trend="+5.2%"
            className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20"
          />
          <StatsCard
            title="Total Earned"
            value={`$${(126.50 + 0.045 * 3200 + 0.002 * 65000).toFixed(2)}`}
            icon={TrendingUp}
            trend="+12.4%"
            className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          <StatsCard
            title="Active Positions"
            value="3"
            icon={PieChart}
            trend="Stable"
            className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
          <StatsCard
            title="Avg APY"
            value="6.86%"
            icon={Activity}
            trend="+0.8%"
            className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20"
          />
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="pools" className="data-[state=active]:bg-blue-600">Lending Pools</TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-blue-600">My Positions</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pools" className="space-y-6">
            <div className="grid gap-6">
              {pools.map((pool) => (
                <PoolCard
                  key={pool.id}
                  pool={pool}
                  onDeposit={handleDeposit}
                  onWithdraw={handleWithdraw}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <UserPositions pools={pools} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Protocol Overview</CardTitle>
                  <CardDescription>Key metrics and performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">${(protocolStats.totalValueLocked / 1000000).toFixed(1)}M</div>
                      <div className="text-slate-400 text-sm">Total Value Locked</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">${(protocolStats.totalEarned / 1000000).toFixed(1)}M</div>
                      <div className="text-slate-400 text-sm">Total Earned</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Average Pool Utilization</span>
                      <span className="text-white">72.3%</span>
                    </div>
                    <Progress value={72.3} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Your Performance</CardTitle>
                  <CardDescription>Personal lending metrics and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">7.2%</div>
                      <div className="text-slate-400 text-sm">Avg APY Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">45 days</div>
                      <div className="text-slate-400 text-sm">Avg Position Time</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Portfolio Growth</span>
                      <span className="text-green-400">+24.6%</span>
                    </div>
                    <Progress value={24.6} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        pool={selectedPool}
      />
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        pool={selectedPool}
      />
    </div>
  );
};

export default Index;
