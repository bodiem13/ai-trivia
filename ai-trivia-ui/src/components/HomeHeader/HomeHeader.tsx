import { Title1 } from "@fluentui/react-components";
import styles from "./HomeHeader.module.css";

export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <Title1 className={styles.title}>🎉 AI Trivia Challenge</Title1>
    </header>
  );
}
