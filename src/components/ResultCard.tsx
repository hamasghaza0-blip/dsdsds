import React from "react";
import { Result } from "../types";
import { Trophy, Medal, Award, User, Hash, BookOpen, Star, CheckCircle, Heart, Sparkles } from "lucide-react";
import { getCategoryColor, getGradeColor } from "../utils/contestStats";

interface ResultCardProps {
  student: Result;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600" />;
    return <Star className="w-8 h-8 text-blue-500" />;
  };

  const getRankText = (rank: number) => {
    if (rank === 1) return "المركز الأول";
    if (rank === 2) return "المركز الثاني";
    if (rank === 3) return "المركز الثالث";
    if (rank <= 10) return `المركز ${rank}`;
    return `الترتيب ${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-500 to-orange-500";
    if (rank === 2) return "from-gray-400 to-gray-600";
    if (rank === 3) return "from-amber-500 to-yellow-600";
    if (rank <= 10) return "from-blue-500 to-purple-600";
    return "from-green-500 to-blue-500";
  };

  const getSuccessMessage = (grade: number) => {
    if (grade >= 90) {
      return {
        message: "مبروك! لقد نجحت بتفوق في المسابقة",
        subMessage: "أداء ممتاز ومشرف، استمر في حفظ كتاب الله",
        icon: <CheckCircle className="w-8 h-8 text-green-500 animate-pulse" />,
        bgColor: "from-green-500 to-emerald-500",
        textColor: "text-green-100"
      };
    } else {
      return {
        message: "لا تيأس، المحاولة القادمة ستكون أفضل بإذن الله",
        subMessage: "كل خطوة في طريق حفظ القرآن لها أجر عظيم، واصل المحاولة",
        icon: <Heart className="w-8 h-8 text-orange-500 animate-pulse" />,
        bgColor: "from-orange-500 to-yellow-500",
        textColor: "text-orange-100"
      };
    }
  };

  const successInfo = getSuccessMessage(student.grade);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
        {/* Header with rank */}
        <div className={`bg-gradient-to-r ${getRankColor(student.rank!)} text-white p-6 text-center`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            {getRankIcon(student.rank!)}
            <h3 className="text-2xl font-bold">{getRankText(student.rank!)}</h3>
          </div>
          <p className="text-white/90">
            {student.grade >= 90 ? "تهانينا على هذا الإنجاز الرائع!" : "شكراً لمشاركتك في المسابقة"}
          </p>
        </div>

        {/* Student details */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <User className="w-6 h-6 text-blue-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">اسم الطالب</p>
              <p className="text-xl font-bold text-gray-800">{student.name || 'غير محدد'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <Hash className="w-6 h-6 text-green-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">رقم الطالب</p>
              <p className="text-xl font-bold text-gray-800">{student.no || student.id || 'غير محدد'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">الفئة</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                  student.category?.toString() || 'غير محدد'
                )}`}
              >
                {student.category?.toString() || 'غير محدد'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <Star className="w-6 h-6 text-yellow-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">الدرجة</p>
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`text-3xl font-bold px-4 py-2 rounded-lg ${getGradeColor(
                    student.grade || 0
                  )}`}
                >
                  {student.grade || 0}
                </span>
                <span className="text-lg text-gray-600">من 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Encouragement message */}
        <div className={`bg-gradient-to-r ${successInfo.bgColor} text-white p-6 text-center relative overflow-hidden`}>
          {/* Background decorative elements */}
          <div className="absolute top-2 right-4 opacity-20">
            <Sparkles className="w-12 h-12 animate-spin-slow" />
          </div>
          <div className="absolute bottom-2 left-4 opacity-15">
            <BookOpen className="w-10 h-10 animate-bounce-slow" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              {successInfo.icon}
              <h4 className={`text-xl font-bold ${successInfo.textColor}`}>
                {successInfo.message}
              </h4>
            </div>
            
            <p className={`text-lg ${successInfo.textColor} mb-4`}>
              {successInfo.subMessage}
            </p>
            
            {student.grade >= 90 ? (
              <div className="space-y-2">
                <p className="text-white/90 font-semibold">
                  🎉 درجة النجاح: {student.grade} من 100
                </p>
                <p className="text-white/80 text-sm">
                  "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ"
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-white/90 font-semibold">
                  📚 درجتك: {student.grade} من 100
                </p>
                <p className="text-white/80 text-sm">
                  "وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ ۚ إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ"
                </p>
                <div className="mt-4 p-3 bg-white/20 rounded-xl">
                  <p className="text-white font-semibold text-sm">
                    💪 نصائح للمرة القادمة:
                  </p>
                  <ul className="text-white/90 text-sm mt-2 space-y-1">
                    <li>• راجع الأجزاء يومياً</li>
                    <li>• اطلب المساعدة من المحفظ</li>
                    <li>• ادع الله أن يعينك على الحفظ</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};