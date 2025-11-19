"use client";

import { Card, Title3, Body1 } from "@fluentui/react-components";
import styles from "./CategoryCard.module.css";

interface Props {
  title: string;
  description: string;
}

export default function CategoryCard({ title, description }: Props) {
  return (
    <Card className={styles.card} appearance="outline">
      <div className={styles.wrapper}>
        <Title3 className={styles.title}>{title}</Title3>
        <Body1 className={styles.description}>{description}</Body1>
      </div>
    </Card>
  );
}
