import { Button } from "@fluentui/react-components";
import { Info20Regular } from "@fluentui/react-icons";
import styles from "./HomeFooter.module.css";

interface FooterProps {
  onShowInstructions: () => void;
}

export default function Footer({ onShowInstructions }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Button
        appearance="secondary"
        icon={<Info20Regular />}
        onClick={onShowInstructions}
        size="medium"
        className={styles.instructionsButton}
      >
        How to Play
      </Button>
    </footer>
  );
}
