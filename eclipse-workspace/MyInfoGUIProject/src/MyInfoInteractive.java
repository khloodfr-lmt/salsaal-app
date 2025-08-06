import javax.swing.*;
import java.awt.event.*;

public class MyInfoInteractive {
    public static void main(String[] args) {
        JFrame frame = new JFrame("My Info");
        frame.setSize(350, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(null);

        // Label و TextField لاسم المستخدم
        JLabel nameLabel = new JLabel("Enter your name:");
        nameLabel.setBounds(20, 20, 150, 25);
        JTextField nameField = new JTextField();
        nameField.setBounds(150, 20, 150, 25);

        // Label و TextField للعمر
        JLabel ageLabel = new JLabel("Enter your age:");
        ageLabel.setBounds(20, 60, 150, 25);
        JTextField ageField = new JTextField();
        ageField.setBounds(150, 60, 150, 25);

        // زر العرض
        JButton showButton = new JButton("عرض");
        showButton.setBounds(120, 100, 80, 30);

        // Label لعرض النتيجة
        JLabel resultLabel = new JLabel("");
        resultLabel.setBounds(20, 140, 300, 25);

        // الحدث عند الضغط على الزر
        showButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText();
                String age = ageField.getText();
                resultLabel.setText("My name is " + name + " and I am " + age + " years old");
            }
        });

        // إضافة العناصر للنافذة
        frame.add(nameLabel);
        frame.add(nameField);
        frame.add(ageLabel);
        frame.add(ageField);
        frame.add(showButton);
        frame.add(resultLabel);

        frame.setVisible(true);
    }
}
