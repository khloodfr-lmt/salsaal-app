
import javax.swing.JFrame;
import javax.swing.JLabel;

public class MyInfoGUI {
    public static void main(String[] args) {
        JFrame frame = new JFrame("My Info");
        frame.setSize(300, 150);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(null);

        JLabel nameLabel = new JLabel("My name is Khulood");
        nameLabel.setBounds(50, 30, 200, 20);

        JLabel ageLabel = new JLabel("I am 32 years old");
        ageLabel.setBounds(50, 60, 200, 20);

        frame.add(nameLabel);
        frame.add(ageLabel);

        frame.setVisible(true);
    }
}