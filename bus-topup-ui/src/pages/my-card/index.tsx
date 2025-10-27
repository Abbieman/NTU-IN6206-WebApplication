import {
  Bus,
  Car,
  CreditCard,
  DollarSign,
  GraduationCap,
  Plus,
  Train,
  Users,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { bindCard, getCardList } from "../../api/card";
import { addTransaction } from "../../api/transaction";
import { useToast } from "../../hooks/useToast";
import type { AnyType } from "../../types";
import { formatDate } from "../../utils/time";

interface Card {
  id: string;
  name?: string;
  cardNumber: string;
  type: "STUDENT" | "SENIOR" | "ADULT";
  balance: number;
  createdAt: string;
  expiredAt: string;
}

const MyCard: React.FC = () => {
  const { toast, ToastWrapper } = useToast();

  const [cards, setCards] = useState<Card[]>([]);
  const [showTopUp, setShowTopUp] = useState<boolean>(false);
  const [showAddCard, setShowAddCard] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedCardType, setSelectedCardType] = useState("");

  const topUpAmounts = [10, 20, 50, 100];

  const cardTypes = [
    {
      type: "STUDENT",
      name: "Student Card",
      icon: GraduationCap,
      color: "from-green-600 to-emerald-700",
      discount: "50% Discount",
    },
    {
      type: "SENIOR",
      name: "Senior Card",
      icon: Users,
      color: "from-orange-600 to-red-700",
      discount: "Free Rides",
    },
    {
      type: "ADULT",
      name: "Adult Card",
      icon: Wallet,
      color: "from-blue-700 to-indigo-900",
      discount: "Standard Fare",
    },
  ];

  const fetchCards = async () => {
    const res = await getCardList();
    const cards: Card[] = [];
    (res.data as Card[]).forEach((card) => {
      cards.push({
        id: card.id,
        cardNumber: card.cardNumber,
        type: card.type,
        balance: card.balance,
        createdAt: formatDate(card.createdAt),
        expiredAt: formatDate(card.expiredAt),
        name:
          card.type === "STUDENT"
            ? "Student Card"
            : card.type === "SENIOR"
            ? "Senior Card"
            : "Adult Card",
      });
    });
    setCards(cards);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleTopUp = async (amount: number) => {
    const res = await addTransaction({
      cardNumber: selectedCard,
      amount: amount as number,
      type: "TOP_UP",
    });
    if (res.code === 200) {
      toast.success(res.msg || "Top up successfully!");
      fetchCards();
    } else {
      return toast.error(res.msg || "Top up failed!");
    }
    setShowTopUp(false);
  };

  const handleAddCard = async () => {
    const res = await bindCard({
      cardNumber: cardNumber.trim(),
      cardType: selectedCardType as string,
    });
    if (res.code === 200) {
      toast.success(res.msg || "Bind card successfully!");
      setShowAddCard(false);
      fetchCards();
    } else {
      return toast.error(res.msg || "Bind card failed!");
    }
  };

  const openTopUpModal = (cardNumber: string) => {
    setSelectedCard(cardNumber);
    setShowTopUp(true);
  };

  const getCardColor = (type: AnyType) => {
    const cardType = cardTypes.find((ct) => ct.type === type);
    return cardType ? cardType.color : "from-blue-700 to-indigo-900";
  };

  const getCardIcon = (type: AnyType) => {
    const cardType = cardTypes.find((ct) => ct.type === type);
    return cardType ? cardType.icon : Wallet;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {ToastWrapper}
      {/* Header */}
      <div className="sticky top-0 h-16 w-full bg-white px-6 py-4 items-center justify-between shadow-sm z-50">
        <h1 className="text-2xl font-bold text-gray-900">My Transit Cards</h1>
      </div>

      <div className="px-4 pt-2 pb-4">
        {/* Promotion Banner */}
        <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">Win ¥60 e-voucher!</h2>
              <p className="text-sm opacity-90 mb-3">
                Take 25 rides each month to participate - See details
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Learn more →
              </button>
            </div>
            <div className="text-4xl">🎟️</div>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="mt-4 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Transit Wallet</h3>
          </div>

          <div className="space-y-2 text-gray-700 text-sm mb-4">
            <p>- QR payment</p>
            <p>- Mastercard® Pay by Account at all acceptance points</p>
            <p>- Alipay+™ supported</p>
          </div>

          <div className="text-blue-600 font-bold text-lg hover:text-blue-700">
            Register Now!
          </div>
        </div>

        {/* My Cards Section */}
        <h3 className="mt-4 mb-4 text-xl font-bold text-gray-900">My Cards</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowAddCard(true)}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center justify-center gap-3"
          >
            <div className="bg-blue-100 rounded-full p-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-700">Add Card</span>
          </button>

          <button
            onClick={() => toast.error("Quick Top-up coming soon!")}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center justify-center gap-3"
          >
            <div className="bg-green-100 rounded-full p-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <span className="font-semibold text-gray-700">Quick Top-up</span>
          </button>
        </div>

        {/* Transit Cards */}
        {cards.map((card) => {
          const CardIcon = getCardIcon(card.type);
          return (
            <div
              key={card.id}
              className={`bg-gradient-to-br ${getCardColor(
                card.type
              )} rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden mb-6`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <CardIcon className="w-6 h-6" />
                    <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {card.name}
                    </span>
                  </div>
                  <button
                    onClick={() => openTopUpModal(card.cardNumber)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold transition"
                  >
                    Top Up
                  </button>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Balance</p>
                    <p className="text-3xl font-bold">
                      ${card.balance.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm mb-1">Valid Until</p>
                    <p className="text-lg font-semibold">{card.expiredAt}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex h-4 gap-6">
                    <Bus className="w-4 h-4" />
                    <Train className="w-4 h-4" />
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs mb-1">Card ID</p>
                    <p className="text-sm font-mono">{card.cardNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {cards.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No cards yet. Click "Add Card" to get started.</p>
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[100]">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Bind Card</h2>
              <div
                onClick={() => {
                  setShowAddCard(false);
                  setSelectedCardType("");
                  setCardNumber("");
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* ✅ Add Card Number Input */}
            <div className="mb-6">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter Card Number"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {/* Card Type List */}
            <div className="space-y-4 mb-6">
              {cardTypes.map((cardType) => {
                const Icon = cardType.icon;
                return (
                  <button
                    key={cardType.type}
                    onClick={() =>
                      setSelectedCardType(cardType.type as AnyType)
                    }
                    className={`w-full p-5 rounded-2xl border-2 transition flex items-center gap-4 ${
                      selectedCardType === cardType.type
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br ${cardType.color} p-4 rounded-xl`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-lg text-gray-900">
                        {cardType.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cardType.discount}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedCardType === cardType.type
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedCardType === cardType.type && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddCard}
              disabled={!selectedCardType || !cardNumber.trim()}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
                selectedCardType && cardNumber.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add Card
            </button>
          </div>
        </div>
      )}

      {/* Top Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[100]">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Select Top-up Amount</h2>
              <div
                onClick={() => {
                  setShowTopUp(false);
                  setSelectedAmount(0);
                  setSelectedCard("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {topUpAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount as AnyType)}
                  className={`p-6 rounded-2xl border-2 font-bold text-xl transition ${
                    selectedAmount === amount
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedAmount && handleTopUp(selectedAmount)}
              disabled={!selectedAmount}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
                selectedAmount
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Top-up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCard;
