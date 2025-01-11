"use client";

import { motion, useInView } from "framer-motion";
import { Code2, Users, Heart, Eye } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Stats as StatsType } from "@/types";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num.toString() + "+";
}

function convertToFarsiNumbers(str: string): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (d) => farsiDigits[parseInt(d)]);
}

type Props = {
  stats: StatsType;
};

export function Stats({ stats }: Props) {
  const STATS_DATA = [
    {
      label: "کاربر فعال",
      value: stats.usersCount,
      icon: Users,
    },
    {
      label: "قطعه کد",
      value: stats.snippetsCount,
      icon: Code2,
    },
    {
      label: "لایک",
      value: stats.likesCount,
      icon: Heart,
    },
    {
      label: "بازدید",
      value: stats.viewsCount,
      icon: Eye,
    },
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 lg:grid-cols-4">
      {STATS_DATA.map((stat, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          key={stat.label}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ scale: 1 }}
            >
              <stat.icon className="mx-auto h-8 w-8 text-primary/60" />
            </motion.div>
            <h3 className="mt-4 text-3xl font-bold">
              <Counter value={stat.value} />
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const firstRender = useRef(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && !firstRender.current) {
      firstRender.current = true;
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return (
    <span className="tabular-nums" ref={ref}>
      {convertToFarsiNumbers(formatNumber(count))}
    </span>
  );
}
